export type Service = {
  name: string;
  logo: string;
};

export const streamingServices: Service[] = [
  { name: 'Netflix', logo: '/services/netflix.svg' },
  { name: 'Spotify', logo: '/services/spotify.svg' },
  { name: 'HBO Max', logo: '/services/hbo-max.svg' },
  { name: 'Crunchyroll', logo: '/services/crunchyroll.svg' },
  { name: 'Apple TV+', logo: '/services/apple-tv-plus.svg' },
  { name: 'Disney+', logo: '/services/disney-plus.svg' },
  { name: 'Amazon Prime', logo: '/services/amazon-prime.svg' },
  { name: 'YouTube Music', logo: '/services/youtube-music.svg' },
];

export const aiServices: Service[] = [
  { name: 'ChatGPT', logo: '/services/chatgpt.svg' },
  { name: 'Claude', logo: '/services/claude.svg' },
];

export const gamingServices: Service[] = [
  { name: 'Nintendo Switch / Switch 2', logo: '/services/nintendo-switch.svg' },
];

export const privacyServices: Service[] = [
  { name: 'Proton VPN', logo: '/services/proton-vpn.svg' },
];
