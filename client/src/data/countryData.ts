import { getCountryDataList, getEmojiFlag } from "countries-list";

export interface PhonePrefix {
  code: string;
  name: string;
  emoji: string;
  iso2: string;
}

// Sorted alphabetical list of country names
export const countries: string[] = getCountryDataList()
  .map((c) => c.name)
  .sort((a, b) => a.localeCompare(b));

// Sorted phone prefixes with flag emoji and ISO code (deduped)
export const phonePrefixes: PhonePrefix[] = getCountryDataList()
  .filter((c) => c.phone && c.phone.length > 0)
  .map((c) => ({
    code: `+${c.phone[0]}`,
    name: c.name,
    emoji: getEmojiFlag(c.iso2),
    iso2: c.iso2,
  }))
  .filter(
    (prefix, index, self) =>
      self.findIndex(
        (p) => p.code === prefix.code && p.emoji === prefix.emoji
      ) === index
  )
  .sort((a, b) => a.name.localeCompare(b.name));
