/* eslint-disable camelcase */
import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing WEBHOOK_SECRET");
  }

  // ✅ Use req.headers instead
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // ✅ RAW body (IMPORTANT)
  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  // ================= CREATE =================
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) return new Response("No email", { status: 400 });

    const user = {
      clerkId: id,
      email,
      username: username || email.split("@")[0],
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      photo: image_url,
    };

    const newUser = await createUser(user);

    if (newUser) {
      const client = await clerkClient();

      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "User created", user: newUser });
  }

  // ================= UPDATE =================
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    if (!id) return new Response("Missing id", { status: 400 });

    const updatedUser = await updateUser(id, {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username || "",
      photo: image_url,
    });

    return NextResponse.json({ message: "User updated", user: updatedUser });
  }

  // ================= DELETE =================
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) return new Response("Missing id", { status: 400 });

    const deletedUser = await deleteUser(id);

    return NextResponse.json({ message: "User deleted", user: deletedUser });
  }

  return new Response("Unhandled event", { status: 200 });
}
