import { Collection, Testimonial } from '../types';

// Collection Image Imports
import silkEditImg from '../assets/images/1770277845519-01.jpeg';
import nocturneVelvetImg from '../assets/images/1770277855626-01.jpeg';
import blackLabelImg from '../assets/images/1770277852270-01.jpeg';
import ivoryResortImg from '../assets/images/1770277875264-01.jpeg';

// Instagram Image Imports
import ig1 from '../assets/images/1000211343.jpg';
import ig2 from '../assets/images/1000211345.jpg';
import ig3 from '../assets/images/1000211349.jpg';
import ig4 from '../assets/images/1000211350.jpg';
import ig5 from '../assets/images/1000211353.jpg';
import ig6 from '../assets/images/1000211359.jpg';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-01',
    title: 'THE SILK EDIT',
    subtitle: 'RAW TEXTURES & ARCHITECTURAL CUTS',
    description: '100% pure Mulberry and raw silk co-ords designed for fluid motion and timeless evening restraint.',
    image: silkEditImg,
    itemCount: 14
  },
  {
    id: 'col-02',
    title: 'NOCTURNE VELVET',
    subtitle: 'HAUTE COUTURE FESTIVE',
    description: 'Deep midnight micro-velvet steeped in antique gold tilla, marori embroidery, and beaten metallic wire.',
    image: nocturneVelvetImg,
    itemCount: 18
  },
  {
    id: 'col-03',
    title: 'BLACK LABEL HOMME',
    subtitle: 'TAILORED EASTERN SILHOUETTES',
    description: 'Structured tropical wool bandhgalas, raw silk kurtas, and prince coats hand-finished with crest buttons.',
    image: blackLabelImg,
    itemCount: 12
  },
  {
    id: 'col-04',
    title: 'IVORY RESORT',
    subtitle: 'MINIMALIST SUMMER ESSENTIALS',
    description: 'Lightweight Belgian linen and breezy cotton-silk co-ords in natural undyed hues with tonal topstitching.',
    image: ivoryResortImg,
    itemCount: 16
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ayla Mansoor',
    location: 'Lahore & London',
    comment: 'The quality of the raw silk and the restraint in gold detailing makes Nigah Clothes Store feel like an international couture house. Truly peerless craftsmanship.',
    rating: 5,
    itemPurchased: 'Zarah Raw Silk Co-ord'
  },
  {
    id: 't-2',
    name: 'Danyal Sherazi',
    location: 'Islamabad',
    comment: 'The Bandhgala tunic fits with bespoke precision. You can feel the weight of the fabric and the matte gold crest buttons add subtle, uncompromising stature.',
    rating: 5,
    itemPurchased: 'Amir Tailored Bandhgala'
  },
  {
    id: 't-3',
    name: 'Zehra Qureshi',
    location: 'Dubai',
    comment: 'Minimalist Pakistani fashion at its absolute zenith. The unboxing experience was breathtaking and delivery arrived in pristine condition within 48 hours.',
    rating: 5,
    itemPurchased: 'Mehrunisa Hand-Pleated Cape'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: ig1,
    tag: '@nigah.official',
    caption: 'Backstage at the Autumn Atelier Showcase.'
  },
  {
    id: 'ig-2',
    image: ig2,
    tag: '@nigah.official',
    caption: 'Pure silk drapery in motion.'
  },
  {
    id: 'ig-3',
    image: ig3,
    tag: '@nigah.official',
    caption: 'The Sartorial Edit: Raw Silk Noir.'
  },
  {
    id: 'ig-4',
    image: ig4,
    tag: '@nigah.official',
    caption: 'Gold wire hand-pleating process.'
  },
  {
    id: 'ig-5',
    image: ig5,
    tag: '@nigah.official',
    caption: 'Midnight micro-velvet archive piece.'
  },
  {
    id: 'ig-6',
    image: ig6,
    tag: '@nigah.official',
    caption: 'Archival botanical motifs redefined.'
  }
];