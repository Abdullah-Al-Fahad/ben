


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getURL(path: string = ''): string {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // If NEXT_PUBLIC_BASE_URL is an empty string, treat it as unset
  if (!baseUrl || baseUrl === '') {
    baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:8000';
  }

  // Ensure baseUrl has a protocol
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `http://${baseUrl}`; // Default to http if no protocol is specified
  }

  try {
    return new URL(path, baseUrl).toString();
  } catch (e) {
    console.error(`Error constructing URL with path: ${path} and baseUrl: ${baseUrl}`, e);
    // Fallback to just the path if URL construction fails, though this might lead to further fetch errors
    return path;
  }
}
