/**
 * Reel data for the Featured Work homepage teaser and /work route.
 * Organized by category with real Instagram embed URLs.
 */

export const reelCategories = [
  { id: "editorial", label: "Editorial" },
  { id: "emotional", label: "Emotional" },
  { id: "joyful", label: "Joyful" },
  { id: "decor", label: "Decor" },
  { id: "transition", label: "Transition" },
  { id: "dialogue", label: "Dialogue" },
  { id: "funny", label: "Funny" },
  { id: "moment", label: "Moment" },
];

export const reelData = [
  // Editorial
  { id: "e1", category: "editorial", title: "Editorial Elegance", couple: "Priya & Arjun", location: "Udaipur", embedUrl: "https://www.instagram.com/reel/DQRPhyWE66b/", poster: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=1067&fit=crop", duration: "0:58" },
  { id: "e2", category: "editorial", title: "Royal Frame", couple: "Riya & Karan", location: "Jaipur", embedUrl: "https://www.instagram.com/reel/DS454BZE4MW/", poster: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=1067&fit=crop", duration: "1:02" },
  { id: "e3", category: "editorial", title: "Bridal Portrait", couple: "Aisha & James", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/Dc3dGgDzLtL/", poster: "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?w=600&h=1067&fit=crop", duration: "0:45" },
  { id: "e4", category: "editorial", title: "Fashion Forward", couple: "Meera & Dev", location: "Mumbai", embedUrl: "https://www.instagram.com/reel/DXrM_3EEwZ5/", poster: "https://images.unsplash.com/photo-1722952934708-749c22eb2e58?w=600&h=1067&fit=crop", duration: "1:12" },
  { id: "e5", category: "editorial", title: "Golden Glow", couple: "Sanjana & Rohan", location: "Goa", embedUrl: "https://www.instagram.com/reel/DUDBhpoj8uIHkq8_HEJcCi1dHHBv-poTQ7GiZg0/", poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=1067&fit=crop", duration: "0:52" },
  { id: "e6", category: "editorial", title: "Styled Together", couple: "Pooja & Harsh", location: "Vadodara", embedUrl: "https://www.instagram.com/reel/DT9boCsDD91/", poster: "https://images.unsplash.com/photo-1722952934661-dde241aeb591?w=600&h=1067&fit=crop", duration: "0:38" },

  // Emotional
  { id: "em1", category: "emotional", title: "Tears of Joy", couple: "Tanvi & Siddharth", location: "Jodhpur", embedUrl: "https://www.instagram.com/reel/DaAmOPWMy0B/", poster: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=1067&fit=crop", duration: "1:24" },
  { id: "em2", category: "emotional", title: "Quiet Moments", couple: "Nidhi & Varun", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DVfFsOYjKq0/", poster: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?w=600&h=1067&fit=crop", duration: "0:56" },
  { id: "em3", category: "emotional", title: "Heart to Heart", couple: "Priya & Arjun", location: "Udaipur", embedUrl: "https://www.instagram.com/reel/DVu9FrWjFSf/", poster: "https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?w=600&h=1067&fit=crop", duration: "1:08" },
  { id: "em4", category: "emotional", title: "Promises Kept", couple: "Riya & Karan", location: "Jaipur", embedUrl: "https://www.instagram.com/reel/DU8FKtvjJpT/", poster: "https://images.unsplash.com/photo-1587271339318-2e78fdf79586?w=600&h=1067&fit=crop", duration: "0:44" },

  // Joyful
  { id: "j1", category: "joyful", title: "Dancefloor Energy", couple: "Aisha & James", location: "Goa", embedUrl: "https://www.instagram.com/reel/DaaTqYJMRT2/", poster: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=1067&fit=crop", duration: "0:34" },
  { id: "j2", category: "joyful", title: "Celebration Mode", couple: "Meera & Dev", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DSm8l6YjFfP/", poster: "https://images.unsplash.com/photo-1741201864879-c5e7f81c98b0?w=600&h=1067&fit=crop", duration: "0:42" },
  { id: "j3", category: "joyful", title: "Pure Happiness", couple: "Sanjana & Rohan", location: "Surat", embedUrl: "https://www.instagram.com/reel/DRW0FgPDMGS/", poster: "https://images.unsplash.com/photo-1728221052130-810b42a6130e?w=600&h=1067&fit=crop", duration: "0:28" },

  // Decor
  { id: "d1", category: "decor", title: "Mandala Magic", couple: "Pooja & Harsh", location: "Vadodara", embedUrl: "https://www.instagram.com/reel/DcD_TeisaOl/", poster: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&h=1067&fit=crop", duration: "0:55" },
  { id: "d2", category: "decor", title: "Floral Grandeur", couple: "Tanvi & Siddharth", location: "Jodhpur", embedUrl: "https://www.instagram.com/reel/DVvlORok9Mv/", poster: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&h=1067&fit=crop", duration: "1:01" },
  { id: "d3", category: "decor", title: "Light & Shadow", couple: "Nidhi & Varun", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DVieBEhDDO1/", poster: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=600&h=1067&fit=crop", duration: "0:49" },
  { id: "d4", category: "decor", title: "Table Stories", couple: "Priya & Arjun", location: "Udaipur", embedUrl: "https://www.instagram.com/reel/DUYeBu1kih4/", poster: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=600&h=1067&fit=crop", duration: "0:36" },

  // Transition
  { id: "tr1", category: "transition", title: "Smooth Cut 01", couple: "Riya & Karan", location: "Jaipur", embedUrl: "https://www.instagram.com/reel/DSEpAgpky09/", poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=1067&fit=crop", duration: "0:18" },
  { id: "tr2", category: "transition", title: "Smooth Cut 02", couple: "Aisha & James", location: "Goa", embedUrl: "https://www.instagram.com/reel/DUsshqZgdNq/", poster: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&h=1067&fit=crop", duration: "0:22" },
  { id: "tr3", category: "transition", title: "Seamless Flow", couple: "Meera & Dev", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DUfan5WDGJE/", poster: "https://images.unsplash.com/photo-1600685890506-593fdf55949b?w=600&h=1067&fit=crop", duration: "0:15" },
  { id: "tr4", category: "transition", title: "Scene Shift", couple: "Sanjana & Rohan", location: "Surat", embedUrl: "https://www.instagram.com/reel/DUS6ILPj0741wBpBRuEbnzcGiqfsSmiA099n6o0/", poster: "https://images.unsplash.com/photo-1727430256509-0f897d6f4765?w=600&h=1067&fit=crop", duration: "0:20" },
  { id: "tr5", category: "transition", title: "Morph Magic", couple: "Pooja & Harsh", location: "Vadodara", embedUrl: "https://www.instagram.com/reel/DUGl0GnjLdn/", poster: "https://images.unsplash.com/photo-1619734089700-842e56497353?w=600&h=1067&fit=crop", duration: "0:17" },

  // Dialogue
  { id: "dl1", category: "dialogue", title: "Vows Unscripted", couple: "Tanvi & Siddharth", location: "Jodhpur", embedUrl: "https://www.instagram.com/reel/DVbFN6wDXGz/", poster: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=1067&fit=crop", duration: "1:30" },
  { id: "dl2", category: "dialogue", title: "Sweet Words", couple: "Nidhi & Varun", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DUnK5NTEccU/", poster: "https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=600&h=1067&fit=crop", duration: "0:48" },
  { id: "dl3", category: "dialogue", title: "Family Toast", couple: "Priya & Arjun", location: "Udaipur", embedUrl: "https://www.instagram.com/reel/DUkel9SkYat/", poster: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=1067&fit=crop", duration: "0:55" },
  { id: "dl4", category: "dialogue", title: "First Look Words", couple: "Riya & Karan", location: "Jaipur", embedUrl: "https://www.instagram.com/reel/DUVjRzgDN7D/", poster: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=1067&fit=crop", duration: "0:38" },
  { id: "dl5", category: "dialogue", title: "Best Man Speech", couple: "Aisha & James", location: "Goa", embedUrl: "https://www.instagram.com/reel/DUGHngyDy_r/", poster: "https://images.unsplash.com/photo-1601121868898-4581104b29de?w=600&h=1067&fit=crop", duration: "1:05" },

  // Funny
  { id: "f1", category: "funny", title: "Dance Floor Fails", couple: "Meera & Dev", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/Dafi-Xjs3IP/", poster: "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=600&h=1067&fit=crop", duration: "0:32" },
  { id: "f2", category: "funny", title: "Groom's Reaction", couple: "Sanjana & Rohan", location: "Surat", embedUrl: "https://www.instagram.com/reel/DUqNiE-EX-t/", poster: "https://images.unsplash.com/photo-1681717166573-f71589207785?w=600&h=1067&fit=crop", duration: "0:25" },
  { id: "f3", category: "funny", title: "Unscripted Laugh", couple: "Pooja & Harsh", location: "Vadodara", embedUrl: "https://www.instagram.com/reel/DUE_ygiDx9ZbRI4k4MpMvbv2qZj9AdTJF9zooo0/", poster: "https://images.unsplash.com/photo-1670774837214-21b88943a6bb?w=600&h=1067&fit=crop", duration: "0:20" },

  // Moment
  { id: "m1", category: "moment", title: "First Look", couple: "Priya & Arjun", location: "Udaipur", embedUrl: "https://www.instagram.com/reel/DUs5dgWgaOS/", poster: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?w=600&h=1067&fit=crop", duration: "0:50" },
  { id: "m2", category: "moment", title: "Tearful Hug", couple: "Riya & Karan", location: "Jaipur", embedUrl: "https://www.instagram.com/reel/Dc8oiUWzPDF/", poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=600&h=1067&fit=crop", duration: "0:40" },
  { id: "m3", category: "moment", title: "Ring Exchange", couple: "Tanvi & Siddharth", location: "Jodhpur", embedUrl: "https://www.instagram.com/reel/DaSe9fpzmwK/", poster: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=1067&fit=crop", duration: "0:35" },
  { id: "m4", category: "moment", title: "Walking Together", couple: "Nidhi & Varun", location: "Ahmedabad", embedUrl: "https://www.instagram.com/reel/DV0MIl1jL6a/", poster: "https://images.unsplash.com/photo-1641279676778-3c94588147fd?w=600&h=1067&fit=crop", duration: "0:45" },
  { id: "m5", category: "moment", title: "Parent Blessing", couple: "Aisha & James", location: "Goa", embedUrl: "https://www.instagram.com/reel/DUVh3hyjA8b/", poster: "https://images.unsplash.com/photo-1681717075175-19feb7a6f664?w=600&h=1067&fit=crop", duration: "0:52" },
  { id: "m6", category: "moment", title: "Farewell Tears", couple: "Pooja & Harsh", location: "Vadodara", embedUrl: "https://www.instagram.com/reel/DUFhLHFj3Km27IQuSxqbNUp8zZHfeCtKrqV98s0/", poster: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=1067&fit=crop", duration: "0:48" },
];

export const instagramProfileUrl = "https://www.instagram.com/shaadi.pitara";

export const contactDetails = {
  name: "Devarsh Jain",
  phone: "+91 93771 50889",
  whatsapp: "https://wa.me/919377150889",
  instagram: "https://www.instagram.com/shaadi.pitara",
  youtube: "https://youtube.com/@shaadi.pitara",
  pinterest: "https://pin.it/5GKckms5T",
};
