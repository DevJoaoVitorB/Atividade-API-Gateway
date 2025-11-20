export function buildHateoas(resource: string, id: number) {
  return {
    self: { href: `/files/${id}` },
    download: { href: `/files/download/${id}` },
    delete: { href: `/files/${id}` }
  };
}
