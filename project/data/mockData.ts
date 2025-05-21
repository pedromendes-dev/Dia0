// Dados mockados para o app

// Categorias
export const categories = [
  { id: 'music', name: 'Música' },
  { id: 'sports', name: 'Esportes' },
  { id: 'art', name: 'Arte' },
  { id: 'food', name: 'Gastronomia' },
  { id: 'technology', name: 'Tecnologia' },
  { id: 'business', name: 'Negócios' },
  { id: 'health', name: 'Saúde' },
  { id: 'education', name: 'Educação' },
];

// Eventos em destaque para o carrossel
export const featuredEvents = [
  {
    id: '1',
    title: 'Festival de Música Verão 2025',
    date: '15-17 Jul, 2025',
    location: 'Parque Ibirapuera, São Paulo',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Conferência de Tecnologia 2025',
    date: '5-7 Ago, 2025',
    location: 'Centro de Convenções, Rio de Janeiro',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Festival Gastronômico',
    date: '12-14 Set, 2025',
    location: 'Parque Villa-Lobos, São Paulo',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Lista de eventos
export const events = [
  {
    id: '1',
    title: 'Festival de Música Verão 2025',
    description: 'Junte-se a nós para três dias de música incrível em cinco palcos com artistas mundialmente reconhecidos e talentos emergentes. Food trucks, instalações artísticas e experiências interativas farão deste um fim de semana inesquecível. Não perca o maior evento musical do ano!',
    date: '15-17 Jul, 2025',
    time: '12:00 - 23:00',
    location: 'Parque Ibirapuera, São Paulo',
    venueName: 'Gramado Principal',
    category: 'Música',
    price: 120,
    isFree: false,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 3500,
    organizer: {
      name: 'EventWave Produções',
      role: 'Organizador do Evento',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
  {
    id: '2',
    title: 'Conferência de Tecnologia 2025',
    description: 'A principal conferência de tecnologia reunindo líderes do setor, inovadores e entusiastas de tecnologia. Com palestrantes renomados, workshops, oportunidades de networking e as últimas novidades em tecnologia. Perfeito para profissionais que querem se manter à frente das tendências do setor.',
    date: '5-7 Ago, 2025',
    time: '9:00 - 18:00',
    location: 'Centro de Convenções, Rio de Janeiro',
    venueName: 'Centro de Convenções RioCentro',
    category: 'Tecnologia',
    price: 350,
    isFree: false,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 1200,
    organizer: {
      name: 'TechForward Brasil',
      role: 'Organizador da Conferência',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
  {
    id: '3',
    title: 'Festival Gastronômico',
    description: 'Uma aventura culinária com os melhores chefs, degustações de vinhos, demonstrações de culinária e food trucks gourmet. Experimente iguarias de todo o mundo e descubra novos sabores nesta celebração da excelência gastronômica.',
    date: '12-14 Set, 2025',
    time: '11:00 - 20:00',
    location: 'Parque Villa-Lobos, São Paulo',
    venueName: 'Área de Eventos Principal',
    category: 'Gastronomia',
    price: 75,
    isFree: false,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 2200,
    organizer: {
      name: 'Grupo Eventos Culinários',
      role: 'Diretor do Festival',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
  {
    id: '4',
    title: 'Exposição de Arte Moderna',
    description: 'Explore obras-primas contemporâneas de artistas consagrados e emergentes nesta exposição imersiva. Instalações interativas, visitas guiadas e palestras com artistas proporcionam uma visão única da expressão artística moderna.',
    date: '8-22 Out, 2025',
    time: '10:00 - 19:00',
    location: 'MASP, São Paulo',
    venueName: 'Museu de Arte de São Paulo',
    category: 'Arte',
    price: 25,
    isFree: false,
    image: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 850,
    organizer: {
      name: 'Curadores ArtSpace',
      role: 'Diretor de Exposição',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
  {
    id: '5',
    title: 'Retiro de Bem-Estar e Yoga',
    description: 'Revitalize seu corpo, mente e espírito neste retiro completo de bem-estar. Aulas de yoga com especialistas, workshops de meditação, orientação nutricional e práticas de saúde holística em um ambiente natural sereno.',
    date: '5-8 Nov, 2025',
    time: 'O dia todo',
    location: 'Serra da Mantiqueira, SP',
    venueName: 'Centro de Retiros Mantiqueira',
    category: 'Saúde',
    price: 450,
    isFree: false,
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 130,
    organizer: {
      name: 'Vida Mindful',
      role: 'Coordenador do Retiro',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
  {
    id: '6',
    title: 'Competição de Startups',
    description: 'Assista startups inovadoras competirem por financiamento e oportunidades de mentoria. Faça networking com empreendedores, investidores e especialistas do setor nesta vitrine emocionante de talentos e ideias empresariais emergentes.',
    date: '10 Dez, 2025',
    time: '13:00 - 21:00',
    location: 'Cubo inovação, São Paulo',
    venueName: 'Cubo Itaú',
    category: 'Negócios',
    price: 0,
    isFree: true,
    image: 'https://images.pexels.com/photos/7692628/pexels-photo-7692628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendees: 320,
    organizer: {
      name: 'Rede Aceleradora Venture',
      role: 'Diretor do Programa',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  },
];

// Ingressos do usuário
export const userTickets = [
  {
    id: '101',
    eventTitle: 'Festival de Música Verão 2025',
    eventImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '15-17 Jul, 2025',
    time: '12:00 - 23:00',
    location: 'Parque Ibirapuera, São Paulo',
    price: 120,
    type: 'VIP',
    isPast: false,
  },
  {
    id: '102',
    eventTitle: 'Conferência de Tecnologia 2025',
    eventImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '5-7 Ago, 2025',
    time: '9:00 - 18:00',
    location: 'Centro de Convenções, Rio de Janeiro',
    price: 350,
    type: 'Acesso Total',
    isPast: false,
  },
  {
    id: '103',
    eventTitle: 'Workshop de Marketing Digital',
    eventImage: 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '15 Abr, 2025',
    time: '10:00 - 16:00',
    location: 'Centro Empresarial, São Paulo',
    price: 75,
    type: 'Padrão',
    isPast: true,
  },
  {
    id: '104',
    eventTitle: 'Exposição de Fotografia',
    eventImage: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '22 Mar, 2025',
    time: '11:00 - 19:00',
    location: 'Galeria de Arte, São Paulo',
    price: 15,
    type: 'Geral',
    isPast: true,
  },
];