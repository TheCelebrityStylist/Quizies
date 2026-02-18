export const nlCities = [
  { slug: "amsterdam", name: "Amsterdam", angle: "internationale teams en drukke horeca" },
  { slug: "rotterdam", name: "Rotterdam", angle: "after-work crowd en moderne venues" },
  { slug: "utrecht", name: "Utrecht", angle: "studenten en city-center borrels" },
  { slug: "den-haag", name: "Den Haag", angle: "expat-publiek en hotels" },
  { slug: "eindhoven", name: "Eindhoven", angle: "tech teams en bedrijfsborrels" },
  { slug: "maastricht", name: "Maastricht", angle: "weekendtoerisme en bourgondische locaties" },
  { slug: "groningen", name: "Groningen", angle: "student nights en competitieve teams" },
  { slug: "nijmegen", name: "Nijmegen", angle: "verenigingen en gezellige kroegen" },
  { slug: "tilburg", name: "Tilburg", angle: "festivalsfeer en groepsuitjes" },
  { slug: "haarlem", name: "Haarlem", angle: "buurtcafés en teamavonden" },
] as const;

export function getCityBySlug(slug: string) {
  return nlCities.find((city) => city.slug === slug);
}
