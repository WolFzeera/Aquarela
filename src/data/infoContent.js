export const pigmentDNA = [
  {
    id: 'locked-1',
    name: 'Permanent Lemon Yellow',
    code: '254',
    technical: 'PY184',
    description: 'Um amarelo brilhante, levemente frio e extremamente puro.',
    muralistNote: 'Opaco e muito resistente à luz. Excelente para criar verdes vibrantes quando misturado com azuis e pontos de luz intensa em murais.',
    hex: '#F6E015'
  },
  {
    id: 'locked-2',
    name: 'Azo Yellow Light',
    code: '268',
    technical: 'PY154/PY184',
    description: 'Amarelo base quente, essencial para o sistema primário de mistura.',
    muralistNote: 'Semi-transparente. Ideal para veladuras ricas e para criar os laranjas mais intensos da sua paleta sem perder a luminosidade.',
    hex: '#FFCC00'
  },
  {
    id: 'locked-3',
    name: 'Yellow Ochre',
    code: '227',
    technical: 'PY42',
    description: 'Tom terroso clássico derivado de óxido de ferro natural ou sintético.',
    muralistNote: 'Opaco e de granulação leve. Perfeito para tons de pele, texturas orgânicas e para neutralizar azuis excessivamente vibrantes.',
    hex: '#E5A83D'
  },
  {
    id: 'locked-4',
    name: 'Permanent Red Light',
    code: '370',
    technical: 'PR254',
    description: 'Um vermelho cardeal quente e forte, conhecido como Vermelho Pirrol.',
    muralistNote: 'Alta força de tingimento (staining) e semi-opaco. Misture com moderação; domina rapidamente outras cores em grandes áreas.',
    hex: '#ED271C'
  },
  {
    id: 'locked-5',
    name: 'Madder Lake Deep',
    code: '331',
    technical: 'PR264/PV19',
    description: 'Vermelho profundo e frio, puxando levemente para o vinho/magenta.',
    muralistNote: 'Muito transparente. O segredo para criar roxos profundos e atmosféricos quando combinado com o Ultramarine Deep.',
    hex: '#B51C34'
  },
  {
    id: 'locked-6',
    name: 'Burnt Sienna',
    code: '411',
    technical: 'PR101/PBk11',
    description: 'Terra avermelhada, o pilar de qualquer paleta botânica ou orgânica.',
    muralistNote: 'Semi-transparente e ligeiramente granulado. Sua mistura com o Ultramarine gera os cinzas e negros mais ricos e complexos para sombras.',
    hex: '#8D3F28'
  },
  {
    id: 'locked-7',
    name: 'Ultramarine Deep',
    code: '506',
    technical: 'PB29',
    description: 'Azul clássico, profundo e com forte viés avermelhado.',
    muralistNote: 'Altamente granulante e transparente. Use para céus noturnos e aproveite sua granulação para criar texturas em superfícies ásperas do mural.',
    hex: '#1E3A8A'
  },
  {
    id: 'locked-8',
    name: 'Cerulean Blue Phthalo',
    code: '535',
    technical: 'PB15/PW6',
    description: 'Azul ciano vibrante e frio, estabilizado com pigmento branco.',
    muralistNote: 'Semi-opaco. Como possui branco na formulação, adiciona solidez às misturas e é perfeito para representar o céu diurno e águas rasas.',
    hex: '#0A74B2'
  },
  {
    id: 'locked-9',
    name: 'Sap Green',
    code: '623',
    technical: 'PY129/PG7',
    description: 'Verde orgânico e quente, formulado a partir de amarelo e verde ftalo.',
    muralistNote: 'Transparente e versátil. Por ser uma cor pré-misturada, reaja com Yellow Ochre para tons mais secos ou com Burnt Sienna para sombras florestais.',
    hex: '#4B713A'
  }
];

export const harmonies = [
  {
    name: 'Tríade Atmosférica (Complementares Divididas)',
    colors: ['#E5A83D', '#1E3A8A', '#B51C34'],
    description: 'Yellow Ochre contrasta maravilhosamente com os tons frios de Ultramarine e Madder Lake, perfeito para sombras densas e quentes.'
  },
  {
    name: 'Tríade Botânica (Análogas)',
    colors: ['#FFCC00', '#4B713A', '#0A74B2'],
    description: 'Harmonia suave usando o amarelo iluminado, verde seiva e um toque de azul cerúleo para folhagens tropicais ricas.'
  },
  {
    name: 'Conflito Dramático (Complementares)',
    colors: ['#ED271C', '#4B713A', '#1E3A8A'],
    description: 'Alto contraste entre o Vermelho Permanente e o Verde Seiva, aprofundado pelo Ultramarine para murais de grande impacto visual.'
  }
];
