import OpengraphImage from "@/components/common/opengraph-image.tsx";

export const runtime = 'edge';

export default async function Image() {
  return await OpengraphImage();
}
