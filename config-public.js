window.INVITATION_CONFIG = {
  couple: {
    names: "Júlia & Jesús",
    shortNames: "Júlia y Jesús",
    dateISO: "2027-04-10",
    dateLabel: "10 de abril de 2027",
    venue: "Mas Les Lloses",
    openingLine: "",
    welcome: "Estamos organizando este día para celebrarlo con todas las personas que sabemos que van a darlo todo. Aquí iremos actualizando toda la información.",
    closingLine: "Qué alegría poder vivirlo juntos."
  },
  venue: {
    mapsUrl: "https://www.google.com/maps/place/Mas+Les+Lloses/@39.650392,-0.2971002,17z/data=!3m1!4b1!4m6!3m5!1s0xd603ffe3b1613fb:0xf491e6d823c53425!8m2!3d39.6503879!4d-0.2945253!16s%2Fg%2F11cmr20dpt?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D",
    description: "El lugar donde nos encontraremos para celebrar la boda. Pronto añadiremos aquí cualquier cosa que os pueda ser útil.",
    image: "assets/mas-les-lloses.png",
    imageAlt: "Ilustración de Mas Les Lloses, lugar de la celebración"
  },
  schedule: [{ time: "12:45", label: "Inicio de la ceremonia" }],
  transport: {
    departureLocation: "",
    departureTime: "",
    departureMapUrl: "",
    return1Time: "",
    return2Time: "",
    note: ""
  },
  logistics: { arrival: "", parking: "", notes: "" },
  /*
   * Referencia configurable mientras no haya hora de inicio confirmada.
   * Se calcula como las 12:45 de Europe/Madrid del día de la boda.
   * Sustituye este valor por HH:MM cuando decidáis otra referencia.
   */
  countdown: { referenceTime: "12:45", timezone: "Europe/Madrid" },
  images: { hero: "CONAMOR26JULIAYJESUS-115.jpg", heroAlt: "Fotografía de Júlia y Jesús", venue: "assets/mas-les-lloses.png" },
  // Formularios independientes: asistencia y sugerencias.
  forms: {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdtb-fXFIuBlKXIap61AIZf19zRRfQXYqGVatMNtv6XOLmVaQ/viewform",
    suggestionsUrl: "https://docs.google.com/forms/d/e/1FAIpQLScjLQns6rwUxMKNkxRw9Y9ASBaTvvGqjOvVEkgRUhNGxnSUQA/viewform"
  },
  galleryUrl: "",
  gift: { iban: "ES3421002908920200253318" },
  privacy: {
    controller: "",
    purpose: "Gestionar la confirmación de asistencia y las necesidades de organización de la boda.",
    contact: "",
    retention: "",
    rights: ""
  },
  theme: { ivory: "#F8F6F1", olive: "#A8BBCB", sand: "#F3B8A5", ink: "#304B65", terracotta: "#EF9D91", paper: "#F8EEE8" },
  sharing: {
    title: "Júlia & Jesús — Nuestra boda",
    description: "Una invitación para compartir un día muy especial: 10 de abril de 2027, en Mas Les Lloses.",
    publicUrl: "https://boda-julia-jesus.github.io/"
  }
};
