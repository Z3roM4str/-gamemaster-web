import {
  catalogRailDefinitions,
  collectionOrder,
  featureOrder,
  genreOrder,
  matchesCatalogRail,
  resolveTaxonomy,
  worldOrder,
  type Collection,
  type GameFeature,
  type Genre,
  type TaxonomyConfidence,
  type World,
} from './game-taxonomy';

type SourceGame = {
  id: string;
  title: string;
  category: string;
  platform: 'Nintendo Switch' | 'Nintendo Switch 2';
  image: string;
  notionUrl: string;
};

export type Platform = SourceGame['platform'];

export type Game = Omit<SourceGame, 'category'> & {
  slug: string;
  sourceCategory: string;
  genres: Genre[];
  worlds: World[];
  collections: Collection[];
  features: GameFeature[];
  featured: boolean;
  taxonomyConfidence: TaxonomyConfidence;
  taxonomyReviewNote?: string;
  manualTaxonomyReview: boolean;
};

// Catálogo comercial vigente: 130 registros después de retirar Fortnite y pases duplicados.
const sourceCatalog: SourceGame[] = [
  { id: "castlestorm-ii", title: "Castlestorm II", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/castlestorm-ii.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b7aec6ff753e22f2d2" },
  { id: "hellblade-senua-s-sacrifice", title: "Hellblade: Senua’s Sacrifice", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/hellblade-senua-s-sacrifice.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381c18eabdc1215a47498" },
  { id: "hotline-miami", title: "Hotline Miami Collection", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/hotline-miami.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d49bc4e466db364ca8" },
  { id: "john-wick-hex", title: "John Wick Hex", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/john-wick-hex.webp", notionUrl: "https://app.notion.com/3c3c151f9f038131b15ee96da7116817" },
  { id: "katana-zero", title: "Katana ZERO", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/katana-zero.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381be9ff3da365b7b58ff" },
  { id: "little-nightmares", title: "Little Nightmares", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/little-nightmares.webp", notionUrl: "https://app.notion.com/3c3c151f9f03814aa327d740cf215589" },
  { id: "little-nightmares-2", title: "Little Nightmares II", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/little-nightmares-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f03815f8c13d5236a3113e9" },
  { id: "my-friend-pedro", title: "My Friend Pedro", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/my-friend-pedro.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381c9af86cb40f588d72b" },
  { id: "ori-blind-forest", title: "Ori and the Blind Forest", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/ori-blind-forest.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a7979bcfc63b809550" },
  { id: "ori-wisps", title: "Ori and the Will of the Wisps", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/ori-wisps.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a3a065e76bf10d6021" },
  { id: "shovel-knight-treasure-trove-con-expansion", title: "Shovel Knight: Treasure Trove (con expansión)", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/shovel-knight-treasure-trove-con-expansion.webp", notionUrl: "https://app.notion.com/3c3c151f9f038116b727ef10a258181b" },
  { id: "steamworld-dig-2", title: "SteamWorld Dig 2", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/steamworld-dig-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f03813da42fd57ba220c558" },
  { id: "steamworld-heist", title: "SteamWorld Heist", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/steamworld-heist.webp", notionUrl: "https://app.notion.com/3c3c151f9f03816e82c7c8f04fc50954" },
  { id: "void-bastards", title: "Void Bastards", category: "Clásicos y joyas", platform: "Nintendo Switch", image: "/games/void-bastards.webp", notionUrl: "https://app.notion.com/3c3c151f9f03817faa1cc0674363e39f" },
  { id: "bioshock", title: "BioShock: The Collection", category: "Shooter", platform: "Nintendo Switch", image: "/games/bioshock.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e6b971ca5446c400c6" },
  { id: "borderlands", title: "Borderlands Legendary Collection", category: "Shooter", platform: "Nintendo Switch", image: "/games/borderlands.webp", notionUrl: "https://app.notion.com/3c3c151f9f03816789c3ce7b8a53e10b" },
  { id: "crysis", title: "Crysis Remastered", category: "Shooter", platform: "Nintendo Switch", image: "/games/crysis.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a7b116fa64dd6018e8" },
  { id: "doom-2016", title: "DOOM (2016)", category: "Shooter", platform: "Nintendo Switch", image: "/games/doom-2016.webp", notionUrl: "https://app.notion.com/3c3c151f9f038185ad02ecbde1552d80" },
  { id: "dying-light-platinum-edition", title: "Dying Light: Platinum Edition", category: "Shooter", platform: "Nintendo Switch", image: "/games/dying-light-platinum-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f03818f86f9e6daf609a7a0" },
  { id: "metroid-prime-remastered", title: "Metroid Prime Remastered", category: "Shooter", platform: "Nintendo Switch", image: "/games/metroid-prime-remastered.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381eabe43d5b61810578a" },
  { id: "plants-vs-zombies-battle-for-neighborville", title: "Plants vs. Zombies: Battle for Neighborville", category: "Shooter", platform: "Nintendo Switch", image: "/games/plants-vs-zombies-battle-for-neighborville.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381bc8357f9d4cca1e3ca" },
  { id: "resident-evil-revelations-2", title: "Resident Evil Revelations 2", category: "Shooter", platform: "Nintendo Switch", image: "/games/resident-evil-revelations-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381619a25efd5e565a981" },
  { id: "splatoon-3", title: "Splatoon 3", category: "Shooter", platform: "Nintendo Switch", image: "/games/splatoon-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b8902ce449f8593372" },
  { id: "wolfenstein-youngblood", title: "Wolfenstein: Youngblood", category: "Shooter", platform: "Nintendo Switch", image: "/games/wolfenstein-youngblood.webp", notionUrl: "https://app.notion.com/3c3c151f9f038124bcdbc58991eb96d9" },
  { id: "xcom-2-collection", title: "XCOM 2 Collection", category: "Shooter", platform: "Nintendo Switch", image: "/games/xcom-2-collection.webp", notionUrl: "https://app.notion.com/3c3c151f9f03811ebea2f74c9792684a" },
  { id: "donkey-kong-bananza", title: "Donkey Kong Bananza", category: "Switch 2", platform: "Nintendo Switch 2", image: "/games/donkey-kong-bananza.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381c5a04cd535210a1e70" },
  { id: "mario-kart-world", title: "Mario Kart World", category: "Switch 2", platform: "Nintendo Switch 2", image: "/games/mario-kart-world.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381048f0acd54db761f1c" },
  { id: "metroid-prime-4", title: "Metroid Prime 4: Beyond", category: "Switch 2", platform: "Nintendo Switch 2", image: "/games/metroid-prime-4.webp", notionUrl: "https://app.notion.com/3c3c151f9f038184aad1d3feb7397948" },
  { id: "pokemon-pokopia", title: "Pokemon Pokopia", category: "Switch 2", platform: "Nintendo Switch 2", image: "/games/pokemon-pokopia.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a18081ffdb7906fd37" },
  { id: "resident-evil-9-requiem-8-7", title: "Resident Evil 9 Requiem, 8, 7", category: "Switch 2", platform: "Nintendo Switch 2", image: "/games/resident-evil-9-requiem-8-7.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381f18245c7aa082a923a" },
  { id: "celeste", title: "Celeste", category: "Indies", platform: "Nintendo Switch", image: "/games/celeste.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381349697d77b6533cb67" },
  { id: "hollow-knight", title: "Hollow Knight", category: "Indies", platform: "Nintendo Switch", image: "/games/hollow-knight.webp", notionUrl: "https://app.notion.com/3c3c151f9f03817c8ae6d704bb78764b" },
  { id: "membrane", title: "Membrane", category: "Indies", platform: "Nintendo Switch", image: "/games/membrane.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381dbac84f595ea878725" },
  { id: "pixeljunk-monsters-2", title: "PixelJunk Monsters 2", category: "Indies", platform: "Nintendo Switch", image: "/games/pixeljunk-monsters-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a5ab20d7a1bff38d78" },
  { id: "captain-toad", title: "Captain Toad: Treasure Tracker + DLC", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/captain-toad.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381808337ce832a92260d" },
  { id: "luigi-mansion-3", title: "Luigi’s Mansion 3", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/luigi-mansion-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381dfaef1e7d69babd708" },
  { id: "mario-and-sonic-at-the-olympic-games-tokyo-2020", title: "Mario & Sonic at the Olympic Games Tokyo 2020", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-and-sonic-at-the-olympic-games-tokyo-2020.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381be9fdefa31cf27ef53" },
  { id: "mario-rabbids", title: "Mario + Rabbids Sparks of Hope", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-rabbids.webp", notionUrl: "https://app.notion.com/3c3c151f9f03811aaf22f2e8c2c054cc" },
  { id: "mario-kart-8", title: "Mario Kart 8 Deluxe", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-kart-8.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381958b31eb38a788cd81" },
  { id: "mario-party-jamboree", title: "Mario Party Jamboree", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-party-jamboree.webp", notionUrl: "https://app.notion.com/3c3c151f9f038137a0e4e51e5fa7a5b4" },
  { id: "mario-party-superstars", title: "Mario Party Superstars", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-party-superstars.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381dfbf15d22b1a91f33b" },
  { id: "mario-strikers", title: "Mario Strikers: Battle League", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-strikers.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e89333c2f6549f7382" },
  { id: "new-mario-u", title: "New Super Mario Bros. U Deluxe", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/new-mario-u.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d087a9c4f947bc6216" },
  { id: "mario-origami", title: "Paper Mario: The Origami King", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-origami.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381dea918e6af4539f733" },
  { id: "super-mario-3d-all-stars-coleccion-3-en-1", title: "Super Mario 3D All-Stars (colección 3 en 1)", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/super-mario-3d-all-stars-coleccion-3-en-1.webp", notionUrl: "https://app.notion.com/3c3c151f9f038169977ee9b1e948233e" },
  { id: "mario-3d-world", title: "Super Mario 3D World + Bowser’s Fury", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-3d-world.webp", notionUrl: "https://app.notion.com/3c3c151f9f038193bd62fa858e7836f1" },
  { id: "mario-wonder", title: "Super Mario Bros. Wonder", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-wonder.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381629a9aedb8a85073d2" },
  { id: "super-mario-galaxy-2", title: "Super Mario Galaxy 2", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/super-mario-galaxy-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381768a76d1c01846917c" },
  { id: "mario-maker-2", title: "Super Mario Maker 2", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-maker-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381dcb9a2ceb686d0d2e7" },
  { id: "mario-odyssey", title: "Super Mario Odyssey", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-odyssey.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381699322e6ee3d798f8b" },
  { id: "super-mario-party", title: "Super Mario Party", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/super-mario-party.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b4bf6befb75a563ac9" },
  { id: "mario-rpg", title: "Super Mario RPG", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/mario-rpg.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d5abf2fbeefda8b634" },
  { id: "super-smash-bros-ultimate", title: "Super Smash Bros. Ultimate", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/super-smash-bros-ultimate.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381688e4cd6c5d1cee61e" },
  { id: "warioware-get-it-together", title: "WarioWare: Get It Together!", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/warioware-get-it-together.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381ce8e28e83cfaa3ae47" },
  { id: "yoshi-s-crafted-world", title: "Yoshi’s Crafted World", category: "Mundo Mario", platform: "Nintendo Switch", image: "/games/yoshi-s-crafted-world.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381438217f019f97e4c50" },
  { id: "advance-wars-1-2-re-boot-camp", title: "Advance Wars 1+2: Re-Boot Camp", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/advance-wars-1-2-re-boot-camp.webp", notionUrl: "https://app.notion.com/3c3c151f9f038174914ece1812ddaa2f" },
  { id: "animal-crossing-new-horizons", title: "Animal Crossing: New Horizons", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/animal-crossing-new-horizons.webp", notionUrl: "https://app.notion.com/3c3c151f9f03810099e6e81e8c4f9c62" },
  { id: "batman-arkham-trilogy", title: "Batman: Arkham Trilogy", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/batman-arkham-trilogy.webp", notionUrl: "https://app.notion.com/3c3c151f9f038109aaa7df3985bc0fa4" },
  { id: "bayonetta", title: "Bayonetta", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/bayonetta.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381748f5de6f1bc313ec2" },
  { id: "bayonetta-3", title: "Bayonetta 3", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/bayonetta-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f038198adffdd9bdb31e72d" },
  { id: "cuphead", title: "Cuphead", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/cuphead.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d0bf5bc153da29250d" },
  { id: "dragon-ball-fighterz-fighterz-edition", title: "Dragon Ball FighterZ – FighterZ Edition", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/dragon-ball-fighterz-fighterz-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f038107bc8ad37eff2a095b" },
  { id: "fall-guys", title: "Fall Guys", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/fall-guys.webp", notionUrl: "https://app.notion.com/3c3c151f9f03813981b5dda86066bb47" },
  { id: "fifa-20", title: "FIFA 20", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/fifa-20.webp", notionUrl: "https://app.notion.com/3c3c151f9f03811b8330de58b5d5d19f" },
  { id: "fifa-21", title: "FIFA 21", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/fifa-21.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381bca006f956156df6cf" },
  { id: "grand-theft-auto-the-trilogy-the-definitive-edition", title: "Grand Theft Auto: The Trilogy – The Definitive Edition", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/grand-theft-auto-the-trilogy-the-definitive-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381deafedf5f138fd6f29" },
  { id: "hades", title: "Hades", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/hades.webp", notionUrl: "https://app.notion.com/3c3c151f9f03815e83eee41595708aec" },
  { id: "jump-force-deluxe-edition", title: "Jump Force: Deluxe Edition", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/jump-force-deluxe-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381c1b78fe9d97b7c5840" },
  { id: "just-dance-2021", title: "Just Dance 2021", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/just-dance-2021.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381f79d0ada647abcd0bd" },
  { id: "kimetsu-no-yaiba-demon-slayer-the-hinokami-chronicles", title: "Kimetsu no Yaiba: Demon Slayer – The Hinokami Chronicles", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/kimetsu-no-yaiba-demon-slayer-the-hinokami-chronicles.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381aab88af2adcff0ac5f" },
  { id: "kirby-and-the-forgotten-land", title: "Kirby and the Forgotten Land", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/kirby-and-the-forgotten-land.webp", notionUrl: "https://app.notion.com/3c3c151f9f03816db6bcfe44f19d23f2" },
  { id: "metal-gear-solid-master-collection-vol-1", title: "Metal Gear Solid: Master Collection Vol. 1", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/metal-gear-solid-master-collection-vol-1.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381fcbab7c2ae4907735a" },
  { id: "metroid-dread", title: "Metroid Dread", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/metroid-dread.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e8a981c4ea3dc28643" },
  { id: "minecraft", title: "Minecraft", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/minecraft.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d6833fc3332f924b4c" },
  { id: "minecraft-dungeons", title: "Minecraft Dungeons", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/minecraft-dungeons.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381df92b6da2b8bb968f8" },
  { id: "minecraft-legends", title: "Minecraft Legends", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/minecraft-legends.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381569de3dfe1d3e5a794" },
  { id: "mortal-kombat-11", title: "Mortal Kombat 11", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/mortal-kombat-11.webp", notionUrl: "https://app.notion.com/3c3c151f9f038120ae58d01ff3009392" },
  { id: "naruto-shippuden-ultimate-ninja-storm-4-road-to-boruto", title: "Naruto Shippuden: Ultimate Ninja Storm 4 Road to Boruto", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/naruto-shippuden-ultimate-ninja-storm-4-road-to-boruto.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381568593cf1bf6630b35" },
  { id: "switch-sports", title: "Nintendo Switch Sports", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/switch-sports.webp", notionUrl: "https://app.notion.com/3c3c151f9f03811f8932d56abca7e821" },
  { id: "pikmin-1-2", title: "Pikmin 1+2", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/pikmin-1-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f03810a9fbbffe59675fc38" },
  { id: "pikmin-3-deluxe", title: "Pikmin 3 Deluxe", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/pikmin-3-deluxe.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381aba82bcaebe2d3a12d" },
  { id: "pikmin-4", title: "Pikmin 4", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/pikmin-4.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e59540f9c1269cf99c" },
  { id: "portal", title: "Portal: Companion Collection", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/portal.webp", notionUrl: "https://app.notion.com/3c3c151f9f038191aa78e4ba06477d15" },
  { id: "red-dead", title: "Red Dead Redemption", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/red-dead.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e48531f3b768903923" },
  { id: "civilization-vi", title: "Sid Meier’s Civilization VI", category: "Otros destacados", platform: "Nintendo Switch", image: "/games/civilization-vi.webp", notionUrl: "https://app.notion.com/3c3c151f9f03819690e0db663dc1be5f" },
  { id: "pokemon-detective", title: "Detective Pikachu Returns", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-detective.webp", notionUrl: "https://app.notion.com/3c3c151f9f03810b881ac5c57969840e" },
  { id: "pokemon-snap", title: "New Pokémon Snap", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-snap.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381de9573f88681c7e9ef" },
  { id: "pokemon-diamante-brillante", title: "Pokémon Diamante Brillante", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-diamante-brillante.webp", notionUrl: "https://app.notion.com/3c3c151f9f03814eabd4d541057e5106" },
  { id: "pokemon-arceus", title: "Pokémon Leyendas: Arceus", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-arceus.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b0843ce6e915142dca" },
  { id: "pokemon-za", title: "Pokémon Leyendas: Z-A", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-za.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b1875ff0cfe22a100a" },
  { id: "pokemon-mystery", title: "Pokémon Mystery Dungeon: Rescue Team DX", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-mystery.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381d994ddf687c0beac03" },
  { id: "pokemon-perla-reluciente", title: "Pokémon Perla Reluciente", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-perla-reluciente.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381bd98cffc4ad87e1f1c" },
  { id: "pokemon-scarlet", title: "Pokémon Scarlet", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-scarlet.webp", notionUrl: "https://app.notion.com/3c3c151f9f038175ba3ef7bc3ccbce2a" },
  { id: "pokemon-violet", title: "Pokémon Violet (sin expansión)", category: "Pokémon", platform: "Nintendo Switch", image: "/games/pokemon-violet.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a7a969e74a0ee0709a" },
  { id: "assassin-s-creed-the-rebel-collection", title: "Assassin’s Creed: The Rebel Collection", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/assassin-s-creed-the-rebel-collection.webp", notionUrl: "https://app.notion.com/3c3c151f9f038151af68d5b0d799967f" },
  { id: "bravely-default-ii", title: "Bravely Default II", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/bravely-default-ii.webp", notionUrl: "https://app.notion.com/3c3c151f9f038197b0cfdaaa16ad0693" },
  { id: "crash-bandicoot-4-it-s-about-time", title: "Crash Bandicoot 4: It’s About Time", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/crash-bandicoot-4-it-s-about-time.webp", notionUrl: "https://app.notion.com/3c3c151f9f038110b4abe22bca75f0e5" },
  { id: "crash-bandicoot-n-sane-trilogy", title: "Crash Bandicoot N. Sane Trilogy", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/crash-bandicoot-n-sane-trilogy.webp", notionUrl: "https://app.notion.com/3c3c151f9f03810ea0c1c113195dc002" },
  { id: "diablo-ii-resurrected", title: "Diablo II: Resurrected", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/diablo-ii-resurrected.webp", notionUrl: "https://app.notion.com/3c3c151f9f03812eae47cafa52cbb5da" },
  { id: "diablo-3", title: "Diablo III: Eternal Collection", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/diablo-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f03817baf3dc3498c6ec7af" },
  { id: "divinity-2", title: "Divinity: Original Sin 2 – Definitive Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/divinity-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381f9814dfc7f5c54aa76" },
  { id: "dragon-ball-z-kakarot-a-new-power-awakens-set", title: "Dragon Ball Z: Kakarot + A New Power Awakens Set", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/dragon-ball-z-kakarot-a-new-power-awakens-set.webp", notionUrl: "https://app.notion.com/3c3c151f9f03812d9c8ccfd8c51b884c" },
  { id: "dragon-quest-xi-s-echoes-of-an-elusive-age-definitive-edition", title: "Dragon Quest XI S: Echoes of an Elusive Age – Definitive Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/dragon-quest-xi-s-echoes-of-an-elusive-age-definitive-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f03815d9a48f0894a7748bf" },
  { id: "fire-emblem-engage", title: "Fire Emblem Engage", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/fire-emblem-engage.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a3b6b5e9f1f61d01cc" },
  { id: "fire-emblem", title: "Fire Emblem: Three Houses", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/fire-emblem.webp", notionUrl: "https://app.notion.com/3c3c151f9f038159a2eaf2c547a19f21" },
  { id: "hogwarts-legacy", title: "Hogwarts Legacy", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/hogwarts-legacy.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a19a9ee49acce2d4cc" },
  { id: "immortals-fenyx-rising", title: "Immortals Fenyx Rising", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/immortals-fenyx-rising.webp", notionUrl: "https://app.notion.com/3c3c151f9f03817794fcc9ac484895f4" },
  { id: "marvel-ultimate-alliance-3-the-black-order", title: "Marvel Ultimate Alliance 3: The Black Order", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/marvel-ultimate-alliance-3-the-black-order.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381268280dcccf2d3f38f" },
  { id: "monster-hunter-rise", title: "Monster Hunter Rise", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/monster-hunter-rise.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381b9a0b6f76ac33e923f" },
  { id: "ni-no-kuni-wrath-of-the-white-witch", title: "Ni no Kuni: Wrath of the White Witch", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/ni-no-kuni-wrath-of-the-white-witch.webp", notionUrl: "https://app.notion.com/3c3c151f9f03816f9534fadc010b6809" },
  { id: "nier", title: "NieR: Automata The End of YoRHa Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/nier.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e89a08eaeed6da6930" },
  { id: "ninja-gaiden-master-collection", title: "Ninja Gaiden: Master Collection", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/ninja-gaiden-master-collection.webp", notionUrl: "https://app.notion.com/3c3c151f9f03812b801acb25c66b3568" },
  { id: "no-more-heroes-1-and-2", title: "No More Heroes 1 & 2", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/no-more-heroes-1-and-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f03812c8326fac0637c32b7" },
  { id: "octopath-traveler", title: "Octopath Traveler", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/octopath-traveler.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381869a36f9fe78e6c062" },
  { id: "pillars-of-eternity-complete-edition", title: "Pillars of Eternity: Complete Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/pillars-of-eternity-complete-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381f3b748caac38fda5f8" },
  { id: "sonic-frontiers", title: "Sonic Frontiers", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/sonic-frontiers.webp", notionUrl: "https://app.notion.com/3c3c151f9f03811d88c8c89bcfde39b0" },
  { id: "skyrim", title: "The Elder Scrolls V: Skyrim", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/skyrim.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381798d0cc497cbdfcf74" },
  { id: "the-outer-worlds", title: "The Outer Worlds", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/the-outer-worlds.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381179a48ed3fac4bdb82" },
  { id: "witcher-3", title: "The Witcher 3: Wild Hunt – Complete Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/witcher-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f038199b028ef686bf0acea" },
  { id: "the-wonderful-101-remastered", title: "The Wonderful 101: Remastered", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/the-wonderful-101-remastered.webp", notionUrl: "https://app.notion.com/3c3c151f9f03818f92add462abc9a7d4" },
  { id: "triangle-strategy", title: "Triangle Strategy", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/triangle-strategy.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381fb86dfcb0b5f3b8232" },
  { id: "xenoblade-chronicles-2", title: "Xenoblade Chronicles 2", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/xenoblade-chronicles-2.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381e09325fa2c88eaa4ca" },
  { id: "xenoblade-chronicles-3", title: "Xenoblade Chronicles 3", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/xenoblade-chronicles-3.webp", notionUrl: "https://app.notion.com/3c3c151f9f038104ba3af6292617fcd1" },
  { id: "xenoblade-chronicles-definitive-edition", title: "Xenoblade Chronicles: Definitive Edition", category: "RPG y aventuras", platform: "Nintendo Switch", image: "/games/xenoblade-chronicles-definitive-edition.webp", notionUrl: "https://app.notion.com/3c3c151f9f038167ad4dc038e70a060e" },
  { id: "hyrule-warriors-age-of-calamity", title: "Hyrule Warriors: Age of Calamity", category: "Zelda", platform: "Nintendo Switch", image: "/games/hyrule-warriors-age-of-calamity.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381c79786e005abf4cdc3" },
  { id: "zelda-botw", title: "The Legend of Zelda: Breath of the Wild", category: "Zelda", platform: "Nintendo Switch", image: "/games/zelda-botw.webp", notionUrl: "https://app.notion.com/3c3c151f9f03817981ffc467211d4314" },
  { id: "zelda-echoes", title: "The Legend of Zelda: Echoes of Wisdom", category: "Zelda", platform: "Nintendo Switch", image: "/games/zelda-echoes.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381198695f9b539e9a03f" },
  { id: "zelda-awakening", title: "The Legend of Zelda: Link’s Awakening", category: "Zelda", platform: "Nintendo Switch", image: "/games/zelda-awakening.webp", notionUrl: "https://app.notion.com/3c3c151f9f0381a091b9f546c94f0e12" },
  { id: "zelda-skyward", title: "The Legend of Zelda: Skyward Sword HD", category: "Zelda", platform: "Nintendo Switch", image: "/games/zelda-skyward.webp", notionUrl: "https://app.notion.com/3c3c151f9f03810fa6f9e5f19de96e17" },
  { id: "zelda-totk", title: "The Legend of Zelda: Tears of the Kingdom", category: "Zelda", platform: "Nintendo Switch", image: "/games/zelda-totk.webp", notionUrl: "https://app.notion.com/3c3c151f9f038156a0d8f48a315fa365" },
];

function enrichGame(game: SourceGame): Game {
  const taxonomy = resolveTaxonomy(game.id, game.platform);

  return {
    id: game.id,
    slug: game.id,
    title: game.title,
    sourceCategory: game.category,
    platform: game.platform,
    image: game.image,
    notionUrl: game.notionUrl,
    genres: taxonomy.genres,
    worlds: taxonomy.worlds,
    collections: taxonomy.collections,
    features: taxonomy.features,
    featured: taxonomy.featured,
    taxonomyConfidence: taxonomy.confidence,
    taxonomyReviewNote: taxonomy.reviewNote,
    manualTaxonomyReview: taxonomy.manualReview,
  };
}

export const catalog: Game[] = sourceCatalog.map(enrichGame);

export const platforms: Platform[] = ['Nintendo Switch', 'Nintendo Switch 2'];
export const sourceCategories = [...new Set(catalog.map((game) => game.sourceCategory))];
export const genres = genreOrder.filter((genre) => catalog.some((game) => game.genres.includes(genre)));
export const worlds = worldOrder.filter((world) => catalog.some((game) => game.worlds.includes(world)));
export const collections = collectionOrder.filter((collection) => catalog.some((game) => game.collections.includes(collection)));
export const features = featureOrder.filter((feature) => catalog.some((game) => game.features.includes(feature)));

export const catalogShelves = catalogRailDefinitions.map((rail) => ({
  id: rail.id,
  title: rail.title,
  description: rail.description,
  homepage: rail.homepage,
  games: catalog
    .filter((game) => matchesCatalogRail(game, rail))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, 'es')),
}));

export const homepageCatalogShelves = catalogShelves.filter((shelf) => shelf.homepage);
export const exploreCatalogShelves = catalogShelves.filter((shelf) => !shelf.homepage);

export function getGameBySlug(slug: string) {
  return catalog.find((game) => game.slug === slug);
}

export function getRelatedGames(game: Game, limit = 8) {
  return catalog
    .filter((candidate) => candidate.id !== game.id)
    .map((candidate) => {
      const score =
        (candidate.platform === game.platform ? 2 : 0) +
        candidate.worlds.filter((world) => game.worlds.includes(world)).length * 4 +
        candidate.genres.filter((genre) => game.genres.includes(genre)).length * 2 +
        candidate.collections.filter((collection) => game.collections.includes(collection)).length +
        candidate.features.filter((feature) => game.features.includes(feature)).length;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title, 'es'))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
