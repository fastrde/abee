#!/usr/bin/env node

var fs = require('fs');
// Load commands

var cmds = fs.readdirSync('cmds');
console.log(cmds);
