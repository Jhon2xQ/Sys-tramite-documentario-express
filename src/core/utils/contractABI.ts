export const contractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "idTramite", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "idMovimiento", type: "uint256" },
      { indexed: false, internalType: "address", name: "emisor", type: "address" },
      { indexed: false, internalType: "address", name: "receptor", type: "address" },
    ],
    name: "movimientoCreado",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "idTramite", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "idMovimiento", type: "uint256" },
    ],
    name: "movimientoEliminado",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "idTramite", type: "uint256" },
      { indexed: false, internalType: "address", name: "creador", type: "address" },
      { indexed: false, internalType: "uint256", name: "tipoTramite", type: "uint256" },
    ],
    name: "tramiteCreado",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_idTramite", type: "uint256" },
      { internalType: "address", name: "_receptor", type: "address" },
      { internalType: "uint256[]", name: "_documentos", type: "uint256[]" },
    ],
    name: "crearMovimiento",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tipoTramite", type: "uint256" },
      { internalType: "address", name: "_receptor", type: "address" },
      { internalType: "uint256[]", name: "_documentos", type: "uint256[]" },
    ],
    name: "crearTramite",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_idTramite", type: "uint256" }],
    name: "getHistorial",
    outputs: [
      {
        components: [
          { internalType: "address", name: "emisor", type: "address" },
          { internalType: "address", name: "receptor", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "uint256[]", name: "documentos", type: "uint256[]" },
        ],
        internalType: "struct Tramites.Movimiento[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_idMovimiento", type: "uint256" }],
    name: "getMovimiento",
    outputs: [
      {
        components: [
          { internalType: "address", name: "emisor", type: "address" },
          { internalType: "address", name: "receptor", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "uint256[]", name: "documentos", type: "uint256[]" },
        ],
        internalType: "struct Tramites.Movimiento",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_idTramite", type: "uint256" }],
    name: "getTramite",
    outputs: [
      {
        components: [
          { internalType: "address", name: "creador", type: "address" },
          { internalType: "uint256", name: "tipoTramite", type: "uint256" },
          { internalType: "uint256[]", name: "seguimiento", type: "uint256[]" },
        ],
        internalType: "struct Tramites.Tramite",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_sender", type: "address" }],
    name: "getUserTramites",
    outputs: [
      {
        components: [
          { internalType: "address", name: "creador", type: "address" },
          { internalType: "uint256", name: "tipoTramite", type: "uint256" },
          { internalType: "uint256[]", name: "seguimiento", type: "uint256[]" },
        ],
        internalType: "struct Tramites.Tramite[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_idTramite", type: "uint256" }],
    name: "quitarMovimiento",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
