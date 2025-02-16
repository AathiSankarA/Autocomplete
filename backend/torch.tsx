'use strict'

const { torch } = require("js-pytorch");

const device = 'cpu';

let x = torch.randn([8, 4, 5]);
let w = torch.randn([8, 5, 4], true, device);
let b = torch.tensor([0.2, 0.5, 0.1, 0.0], true);

let out = torch.matmul(x, w);
out = torch.add(out, b);

out.backward();

console.log(x);
console.log(b);