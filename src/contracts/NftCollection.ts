import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  TupleReader,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: src => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: src => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: src => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: src => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: src => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: src => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployDefaultCollection = {
  $$type: 'DeployDefaultCollection';
  business_address: Address;
  collection_content: Cell;
};

export function storeDeployDefaultCollection(src: DeployDefaultCollection) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2152417869, 32);
    b_0.storeAddress(src.business_address);
    b_0.storeRef(src.collection_content);
  };
}

export function loadDeployDefaultCollection(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2152417869) {
    throw Error('Invalid prefix');
  }
  let _business_address = sc_0.loadAddress();
  let _collection_content = sc_0.loadRef();
  return {
    $$type: 'DeployDefaultCollection' as const,
    business_address: _business_address,
    collection_content: _collection_content,
  };
}

function loadTupleDeployDefaultCollection(source: TupleReader) {
  let _business_address = source.readAddress();
  let _collection_content = source.readCell();
  return {
    $$type: 'DeployDefaultCollection' as const,
    business_address: _business_address,
    collection_content: _collection_content,
  };
}

function storeTupleDeployDefaultCollection(source: DeployDefaultCollection) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.business_address);
  builder.writeCell(source.collection_content);
  return builder.build();
}

function dictValueParserDeployDefaultCollection(): DictionaryValue<DeployDefaultCollection> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployDefaultCollection(src)).endCell());
    },
    parse: src => {
      return loadDeployDefaultCollection(src.loadRef().beginParse());
    },
  };
}

export type DeployCollection = {
  $$type: 'DeployCollection';
  collection_init: StateInit;
  business_address: Address;
  collection_content: Cell;
};

export function storeDeployCollection(src: DeployCollection) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4229368130, 32);
    b_0.store(storeStateInit(src.collection_init));
    b_0.storeAddress(src.business_address);
    b_0.storeRef(src.collection_content);
  };
}

export function loadDeployCollection(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4229368130) {
    throw Error('Invalid prefix');
  }
  let _collection_init = loadStateInit(sc_0);
  let _business_address = sc_0.loadAddress();
  let _collection_content = sc_0.loadRef();
  return {
    $$type: 'DeployCollection' as const,
    collection_init: _collection_init,
    business_address: _business_address,
    collection_content: _collection_content,
  };
}

function loadTupleDeployCollection(source: TupleReader) {
  const _collection_init = loadTupleStateInit(source.readTuple());
  let _business_address = source.readAddress();
  let _collection_content = source.readCell();
  return {
    $$type: 'DeployCollection' as const,
    collection_init: _collection_init,
    business_address: _business_address,
    collection_content: _collection_content,
  };
}

function storeTupleDeployCollection(source: DeployCollection) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleStateInit(source.collection_init));
  builder.writeAddress(source.business_address);
  builder.writeCell(source.collection_content);
  return builder.build();
}

function dictValueParserDeployCollection(): DictionaryValue<DeployCollection> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployCollection(src)).endCell());
    },
    parse: src => {
      return loadDeployCollection(src.loadRef().beginParse());
    },
  };
}

export type TransferCollection = {
  $$type: 'TransferCollection';
  business_address: Address;
  admin_address: Address;
  collection_content: Cell;
};

export function storeTransferCollection(src: TransferCollection) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1891763028, 32);
    b_0.storeAddress(src.business_address);
    b_0.storeAddress(src.admin_address);
    b_0.storeRef(src.collection_content);
  };
}

export function loadTransferCollection(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1891763028) {
    throw Error('Invalid prefix');
  }
  let _business_address = sc_0.loadAddress();
  let _admin_address = sc_0.loadAddress();
  let _collection_content = sc_0.loadRef();
  return {
    $$type: 'TransferCollection' as const,
    business_address: _business_address,
    admin_address: _admin_address,
    collection_content: _collection_content,
  };
}

function loadTupleTransferCollection(source: TupleReader) {
  let _business_address = source.readAddress();
  let _admin_address = source.readAddress();
  let _collection_content = source.readCell();
  return {
    $$type: 'TransferCollection' as const,
    business_address: _business_address,
    admin_address: _admin_address,
    collection_content: _collection_content,
  };
}

function storeTupleTransferCollection(source: TransferCollection) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.business_address);
  builder.writeAddress(source.admin_address);
  builder.writeCell(source.collection_content);
  return builder.build();
}

function dictValueParserTransferCollection(): DictionaryValue<TransferCollection> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTransferCollection(src)).endCell());
    },
    parse: src => {
      return loadTransferCollection(src.loadRef().beginParse());
    },
  };
}

export type LogEventMintRecord = {
  $$type: 'LogEventMintRecord';
  minter: Address;
  item_id: bigint;
  generate_number: bigint;
};

export function storeLogEventMintRecord(src: LogEventMintRecord) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2743565669, 32);
    b_0.storeAddress(src.minter);
    b_0.storeInt(src.item_id, 257);
    b_0.storeInt(src.generate_number, 257);
  };
}

export function loadLogEventMintRecord(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2743565669) {
    throw Error('Invalid prefix');
  }
  let _minter = sc_0.loadAddress();
  let _item_id = sc_0.loadIntBig(257);
  let _generate_number = sc_0.loadIntBig(257);
  return {
    $$type: 'LogEventMintRecord' as const,
    minter: _minter,
    item_id: _item_id,
    generate_number: _generate_number,
  };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
  let _minter = source.readAddress();
  let _item_id = source.readBigNumber();
  let _generate_number = source.readBigNumber();
  return {
    $$type: 'LogEventMintRecord' as const,
    minter: _minter,
    item_id: _item_id,
    generate_number: _generate_number,
  };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.minter);
  builder.writeNumber(source.item_id);
  builder.writeNumber(source.generate_number);
  return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
    },
    parse: src => {
      return loadLogEventMintRecord(src.loadRef().beginParse());
    },
  };
}

export type Tree = {
  $$type: 'Tree';
  name: string;
  type: string;
  region: string;
  location: string;
};

export function storeTree(src: Tree) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.type);
    b_0.storeStringRefTail(src.region);
    let b_1 = new Builder();
    b_1.storeStringRefTail(src.location);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadTree(slice: Slice) {
  let sc_0 = slice;
  let _name = sc_0.loadStringRefTail();
  let _type = sc_0.loadStringRefTail();
  let _region = sc_0.loadStringRefTail();
  let sc_1 = sc_0.loadRef().beginParse();
  let _location = sc_1.loadStringRefTail();
  return {
    $$type: 'Tree' as const,
    name: _name,
    type: _type,
    region: _region,
    location: _location,
  };
}

function loadTupleTree(source: TupleReader) {
  let _name = source.readString();
  let _type = source.readString();
  let _region = source.readString();
  let _location = source.readString();
  return {
    $$type: 'Tree' as const,
    name: _name,
    type: _type,
    region: _region,
    location: _location,
  };
}

function storeTupleTree(source: Tree) {
  let builder = new TupleBuilder();
  builder.writeString(source.name);
  builder.writeString(source.type);
  builder.writeString(source.region);
  builder.writeString(source.location);
  return builder.build();
}

function dictValueParserTree(): DictionaryValue<Tree> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTree(src)).endCell());
    },
    parse: src => {
      return loadTree(src.loadRef().beginParse());
    },
  };
}

export type Mint = {
  $$type: 'Mint';
  tree: Tree;
  destination: Address;
};

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4125504059, 32);
    b_0.store(storeTree(src.tree));
    b_0.storeAddress(src.destination);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4125504059) {
    throw Error('Invalid prefix');
  }
  let _tree = loadTree(sc_0);
  let _destination = sc_0.loadAddress();
  return { $$type: 'Mint' as const, tree: _tree, destination: _destination };
}

function loadTupleMint(source: TupleReader) {
  const _tree = loadTupleTree(source.readTuple());
  let _destination = source.readAddress();
  return { $$type: 'Mint' as const, tree: _tree, destination: _destination };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleTree(source.tree));
  builder.writeAddress(source.destination);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMint(src)).endCell());
    },
    parse: src => {
      return loadMint(src.loadRef().beginParse());
    },
  };
}

export type ChangeTree = {
  $$type: 'ChangeTree';
  tree: Tree;
  price: bigint | null;
};

export function storeChangeTree(src: ChangeTree) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(384254655, 32);
    b_0.store(storeTree(src.tree));
    if (src.price !== null && src.price !== undefined) {
      b_0.storeBit(true).storeInt(src.price, 257);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadChangeTree(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 384254655) {
    throw Error('Invalid prefix');
  }
  let _tree = loadTree(sc_0);
  let _price = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
  return { $$type: 'ChangeTree' as const, tree: _tree, price: _price };
}

function loadTupleChangeTree(source: TupleReader) {
  const _tree = loadTupleTree(source.readTuple());
  let _price = source.readBigNumberOpt();
  return { $$type: 'ChangeTree' as const, tree: _tree, price: _price };
}

function storeTupleChangeTree(source: ChangeTree) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleTree(source.tree));
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserChangeTree(): DictionaryValue<ChangeTree> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeTree(src)).endCell());
    },
    parse: src => {
      return loadChangeTree(src.loadRef().beginParse());
    },
  };
}

export type Transfer = {
  $$type: 'Transfer';
  query_id: bigint;
  new_owner: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_amount: bigint;
  forward_payload: Cell;
};

export function storeTransfer(src: Transfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1607220500, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1607220500) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'Transfer' as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: 'Transfer' as const,
    query_id: _query_id,
    new_owner: _new_owner,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTransfer(source: Transfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
    },
    parse: src => {
      return loadTransfer(src.loadRef().beginParse());
    },
  };
}

export type OwnershipAssigned = {
  $$type: 'OwnershipAssigned';
  query_id: bigint;
  prev_owner: Address;
  forward_payload: Cell;
};

export function storeOwnershipAssigned(src: OwnershipAssigned) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(85167505, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.prev_owner);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadOwnershipAssigned(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 85167505) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _prev_owner = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'OwnershipAssigned' as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _prev_owner = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: 'OwnershipAssigned' as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.prev_owner);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
    },
    parse: src => {
      return loadOwnershipAssigned(src.loadRef().beginParse());
    },
  };
}

export type Excesses = {
  $$type: 'Excesses';
  query_id: bigint;
};

export function storeExcesses(src: Excesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
    },
    parse: src => {
      return loadExcesses(src.loadRef().beginParse());
    },
  };
}

export type GetStaticData = {
  $$type: 'GetStaticData';
  query_id: bigint;
};

export function storeGetStaticData(src: GetStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(801842850, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadGetStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 801842850) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
    },
    parse: src => {
      return loadGetStaticData(src.loadRef().beginParse());
    },
  };
}

export type ReportStaticData = {
  $$type: 'ReportStaticData';
  query_id: bigint;
  index: bigint;
  collection: Address;
};

export function storeReportStaticData(src: ReportStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2339837749, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.index, 256);
    b_0.storeAddress(src.collection);
  };
}

export function loadReportStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2339837749) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _index = sc_0.loadUintBig(256);
  let _collection = sc_0.loadAddress();
  return {
    $$type: 'ReportStaticData' as const,
    query_id: _query_id,
    index: _index,
    collection: _collection,
  };
}

function loadTupleReportStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index = source.readBigNumber();
  let _collection = source.readAddress();
  return {
    $$type: 'ReportStaticData' as const,
    query_id: _query_id,
    index: _index,
    collection: _collection,
  };
}

function storeTupleReportStaticData(source: ReportStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.index);
  builder.writeAddress(source.collection);
  return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
    },
    parse: src => {
      return loadReportStaticData(src.loadRef().beginParse());
    },
  };
}

export type ProveOwnership = {
  $$type: 'ProveOwnership';
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeProveOwnership(src: ProveOwnership) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(81711432, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadProveOwnership(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 81711432) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: 'ProveOwnership' as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleProveOwnership(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: 'ProveOwnership' as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleProveOwnership(source: ProveOwnership) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserProveOwnership(): DictionaryValue<ProveOwnership> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProveOwnership(src)).endCell());
    },
    parse: src => {
      return loadProveOwnership(src.loadRef().beginParse());
    },
  };
}

export type OwnershipProof = {
  $$type: 'OwnershipProof';
  query_id: bigint;
  item_id: bigint;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnershipProof(src: OwnershipProof) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(86296494, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.item_id, 256);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    b_0.storeUint(src.revoked_at, 64);
    if (src.content !== null && src.content !== undefined) {
      b_0.storeBit(true).storeRef(src.content);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadOwnershipProof(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 86296494) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadUintBig(256);
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let _revoked_at = sc_0.loadUintBig(64);
  let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'OwnershipProof' as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnershipProof(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: 'OwnershipProof' as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnershipProof(source: OwnershipProof) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnershipProof(): DictionaryValue<OwnershipProof> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnershipProof(src)).endCell());
    },
    parse: src => {
      return loadOwnershipProof(src.loadRef().beginParse());
    },
  };
}

export type RequestOwner = {
  $$type: 'RequestOwner';
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeRequestOwner(src: RequestOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3502489578, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadRequestOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3502489578) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: 'RequestOwner' as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleRequestOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: 'RequestOwner' as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleRequestOwner(source: RequestOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserRequestOwner(): DictionaryValue<RequestOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRequestOwner(src)).endCell());
    },
    parse: src => {
      return loadRequestOwner(src.loadRef().beginParse());
    },
  };
}

export type OwnerInfo = {
  $$type: 'OwnerInfo';
  query_id: bigint;
  item_id: bigint;
  initiator: Address;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnerInfo(src: OwnerInfo) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(232130531, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.item_id, 256);
    b_0.storeAddress(src.initiator);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    b_0.storeUint(src.revoked_at, 64);
    if (src.content !== null && src.content !== undefined) {
      b_0.storeBit(true).storeRef(src.content);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadOwnerInfo(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 232130531) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadUintBig(256);
  let _initiator = sc_0.loadAddress();
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let _revoked_at = sc_0.loadUintBig(64);
  let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'OwnerInfo' as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnerInfo(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _initiator = source.readAddress();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: 'OwnerInfo' as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnerInfo(source: OwnerInfo) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.initiator);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnerInfo(): DictionaryValue<OwnerInfo> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnerInfo(src)).endCell());
    },
    parse: src => {
      return loadOwnerInfo(src.loadRef().beginParse());
    },
  };
}

export type Destroy = {
  $$type: 'Destroy';
  query_id: bigint;
};

export function storeDestroy(src: Destroy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(520377210, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadDestroy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 520377210) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'Destroy' as const, query_id: _query_id };
}

function loadTupleDestroy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Destroy' as const, query_id: _query_id };
}

function storeTupleDestroy(source: Destroy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserDestroy(): DictionaryValue<Destroy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDestroy(src)).endCell());
    },
    parse: src => {
      return loadDestroy(src.loadRef().beginParse());
    },
  };
}

export type Revoke = {
  $$type: 'Revoke';
  query_id: bigint;
};

export function storeRevoke(src: Revoke) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1871312355, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadRevoke(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1871312355) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'Revoke' as const, query_id: _query_id };
}

function loadTupleRevoke(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Revoke' as const, query_id: _query_id };
}

function storeTupleRevoke(source: Revoke) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserRevoke(): DictionaryValue<Revoke> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRevoke(src)).endCell());
    },
    parse: src => {
      return loadRevoke(src.loadRef().beginParse());
    },
  };
}

export type CollectionData = {
  $$type: 'CollectionData';
  next_item_index: bigint;
  collection_content: Cell;
  owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.next_item_index, 257);
    b_0.storeRef(src.collection_content);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadCollectionData(slice: Slice) {
  let sc_0 = slice;
  let _next_item_index = sc_0.loadIntBig(257);
  let _collection_content = sc_0.loadRef();
  let _owner_address = sc_0.loadAddress();
  return {
    $$type: 'CollectionData' as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: 'CollectionData' as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function storeTupleCollectionData(source: CollectionData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.next_item_index);
  builder.writeCell(source.collection_content);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
    },
    parse: src => {
      return loadCollectionData(src.loadRef().beginParse());
    },
  };
}

export type NftData = {
  $$type: 'NftData';
  is_initialized: boolean;
  index: bigint;
  collection_address: Address;
  owner_address: Address;
  individual_content: Cell;
};

export function storeNftData(src: NftData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_initialized);
    b_0.storeInt(src.index, 257);
    b_0.storeAddress(src.collection_address);
    b_0.storeAddress(src.owner_address);
    b_0.storeRef(src.individual_content);
  };
}

export function loadNftData(slice: Slice) {
  let sc_0 = slice;
  let _is_initialized = sc_0.loadBit();
  let _index = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  let _owner_address = sc_0.loadAddress();
  let _individual_content = sc_0.loadRef();
  return {
    $$type: 'NftData' as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function loadTupleNftData(source: TupleReader) {
  let _is_initialized = source.readBoolean();
  let _index = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _owner_address = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: 'NftData' as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function storeTupleNftData(source: NftData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_initialized);
  builder.writeNumber(source.index);
  builder.writeAddress(source.collection_address);
  builder.writeAddress(source.owner_address);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeNftData(src)).endCell());
    },
    parse: src => {
      return loadNftData(src.loadRef().beginParse());
    },
  };
}

type NftCollection_init_args = {
  $$type: 'NftCollection_init_args';
  master_contract_address: Address;
  collection_index: bigint;
};

function initNftCollection_init_args(src: NftCollection_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.master_contract_address);
    b_0.storeInt(src.collection_index, 257);
  };
}

async function NftCollection_init(master_contract_address: Address, collection_index: bigint) {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    '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'
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNftCollection_init_args({
    $$type: 'NftCollection_init_args',
    master_contract_address,
    collection_index,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4034: { message: `collection is locked` },
  10395: { message: `only owner can withdraw` },
  16756: { message: `not enought money` },
  19053: { message: `only owner can deploy collection` },
  19630: { message: `only owner can lock` },
  23060: { message: `to low price` },
  29763: { message: `to high price` },
  39869: { message: `only business can withdraw` },
  41017: { message: `Only the collection can initialize the NFT item` },
  42691: { message: `only owner can destroy` },
  49977: { message: `only admin can withdraw` },
  50202: { message: `only owner can unlock` },
  57535: { message: `only owner can transfer the collection` },
  61940: { message: `sould bound nft can't be transfered` },
};

const NftCollection_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      { name: 'bounced', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'Deploy',
    header: 2490013878,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'cashback', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'DeployDefaultCollection',
    header: 2152417869,
    fields: [
      { name: 'business_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'DeployCollection',
    header: 4229368130,
    fields: [
      { name: 'collection_init', type: { kind: 'simple', type: 'StateInit', optional: false } },
      { name: 'business_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'TransferCollection',
    header: 1891763028,
    fields: [
      { name: 'business_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'admin_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'LogEventMintRecord',
    header: 2743565669,
    fields: [
      { name: 'minter', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'item_id', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      {
        name: 'generate_number',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'Tree',
    header: null,
    fields: [
      { name: 'name', type: { kind: 'simple', type: 'string', optional: false } },
      { name: 'type', type: { kind: 'simple', type: 'string', optional: false } },
      { name: 'region', type: { kind: 'simple', type: 'string', optional: false } },
      { name: 'location', type: { kind: 'simple', type: 'string', optional: false } },
    ],
  },
  {
    name: 'Mint',
    header: 4125504059,
    fields: [
      { name: 'tree', type: { kind: 'simple', type: 'Tree', optional: false } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'ChangeTree',
    header: 384254655,
    fields: [
      { name: 'tree', type: { kind: 'simple', type: 'Tree', optional: false } },
      { name: 'price', type: { kind: 'simple', type: 'int', optional: true, format: 257 } },
    ],
  },
  {
    name: 'Transfer',
    header: 1607220500,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'new_owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'custom_payload', type: { kind: 'simple', type: 'cell', optional: true } },
      {
        name: 'forward_amount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forward_payload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'OwnershipAssigned',
    header: 85167505,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'prev_owner', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'forward_payload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'Excesses',
    header: 3576854235,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'GetStaticData',
    header: 801842850,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'ReportStaticData',
    header: 2339837749,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'index', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: 'collection', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'ProveOwnership',
    header: 81711432,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'dest', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'forward_payload', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'with_content', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'OwnershipProof',
    header: 86296494,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'item_id', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'revoked_at', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'RequestOwner',
    header: 3502489578,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'dest', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'forward_payload', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'with_content', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'OwnerInfo',
    header: 232130531,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'item_id', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: 'initiator', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'revoked_at', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'Destroy',
    header: 520377210,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'Revoke',
    header: 1871312355,
    fields: [
      { name: 'query_id', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'CollectionData',
    header: null,
    fields: [
      {
        name: 'next_item_index',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'collection_content', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'owner_address', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'NftData',
    header: null,
    fields: [
      { name: 'is_initialized', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'collection_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'owner_address', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'individual_content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
];

const NftCollection_getters: ABIGetter[] = [
  {
    name: 'get_collection_data',
    arguments: [],
    returnType: { kind: 'simple', type: 'CollectionData', optional: false },
  },
  {
    name: 'get_nft_address_by_index',
    arguments: [
      { name: 'index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
  {
    name: 'get_nft_content',
    arguments: [
      { name: 'index', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'individual_content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
    returnType: { kind: 'simple', type: 'cell', optional: false },
  },
  {
    name: 'get_is_locked',
    arguments: [],
    returnType: { kind: 'simple', type: 'bool', optional: false },
  },
  {
    name: 'get_admin_funds',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
];

const NftCollection_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'empty' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Mint' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'TransferCollection' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeTree' } },
  { receiver: 'internal', message: { kind: 'text', text: 'Withdraw' } },
  { receiver: 'internal', message: { kind: 'text', text: 'Admin withdraw' } },
  { receiver: 'internal', message: { kind: 'text', text: 'Lock' } },
  { receiver: 'internal', message: { kind: 'text', text: 'Unlock' } },
];

export class NftCollection implements Contract {
  static async init(master_contract_address: Address, collection_index: bigint) {
    return await NftCollection_init(master_contract_address, collection_index);
  }

  static async fromInit(master_contract_address: Address, collection_index: bigint) {
    const init = await NftCollection_init(master_contract_address, collection_index);
    const address = contractAddress(0, init);
    return new NftCollection(address, init);
  }

  static fromAddress(address: Address) {
    return new NftCollection(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: NftCollection_types,
    getters: NftCollection_getters,
    receivers: NftCollection_receivers,
    errors: NftCollection_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | null
      | Mint
      | TransferCollection
      | ChangeTree
      | 'Withdraw'
      | 'Admin withdraw'
      | 'Lock'
      | 'Unlock'
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Mint'
    ) {
      body = beginCell().store(storeMint(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'TransferCollection'
    ) {
      body = beginCell().store(storeTransferCollection(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ChangeTree'
    ) {
      body = beginCell().store(storeChangeTree(message)).endCell();
    }
    if (message === 'Withdraw') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'Admin withdraw') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'Lock') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'Unlock') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetCollectionData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('get_collection_data', builder.build())).stack;
    const result = loadTupleCollectionData(source);
    return result;
  }

  async getGetNftAddressByIndex(provider: ContractProvider, index: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(index);
    let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
    let builder = new TupleBuilder();
    builder.writeNumber(index);
    builder.writeCell(individual_content);
    let source = (await provider.get('get_nft_content', builder.build())).stack;
    let result = source.readCell();
    return result;
  }

  async getGetIsLocked(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('get_is_locked', builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }

  async getGetAdminFunds(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('get_admin_funds', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }
}
