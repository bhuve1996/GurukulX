import { getDataAdapter } from "@/lib/data";
import { getUserIdFromRequest } from "@/lib/auth";
import { ui } from "@/lib/config";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;
  const adapter = getDataAdapter();
  const comments = await adapter.comments.listByTopicId(topicId);
  return new Response(JSON.stringify({ comments }), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return new Response(JSON.stringify({ error: ui.api.noUser }), { status: 401 });
  const { topicId } = await params;
  let body: { body?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: ui.api.invalidJson }), { status: 400 });
  }
  const text = typeof body.body === "string" ? (body.body as string).trim() : "";
  if (!text) return new Response(JSON.stringify({ error: ui.api.bodyRequired }), { status: 400 });
  const adapter = getDataAdapter();
  const comment = await adapter.comments.add(topicId, userId, text);
  return new Response(JSON.stringify({ comment }), { status: 201, headers: { "Content-Type": "application/json" } });
}
