export function buildHateoas(resource: string, id: number) {
  return {
    self: { href: `/files` },
    download: { href: `/files/download/${id}` },
    upload: { href: `/files/upload` }
  };
}
