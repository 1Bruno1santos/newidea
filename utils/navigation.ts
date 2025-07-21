type PageId =
  | "escudos"
  | "coleta"
  | "caca"
  | "familiares"
  | "fg"
  | "eventos"
  | "herois"
  | "diversos"
  | "tropas"
  | "reino-miragem"
  | "pesquisa"
  | "coliseu"
  | "ninhos"
  | "trocas-navio"
  | "trocas-extravagante"
  | "aceleradores"
  | "sets"
  | "envio-recursos"
  | "admin"
  | "construcoes"

const pageOrder: PageId[] = [
  "escudos",
  "coleta",
  "caca",
  "familiares",
  "fg",
  "reino-miragem",
  "construcoes",
  "pesquisa",
  "coliseu",
  "ninhos",
  "trocas-navio",
  "trocas-extravagante",
  "aceleradores",
  "sets",
  "eventos",
  "herois",
  "diversos",
  "tropas",
  "envio-recursos",
  "admin",
]

export function getNavigationLinks(currentPage: PageId) {
  const currentIndex = pageOrder.indexOf(currentPage)

  const prevPage = currentIndex > 0 ? pageOrder[currentIndex - 1] : null
  const nextPage = currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null

  return {
    prevPage,
    nextPage,
  }
}

