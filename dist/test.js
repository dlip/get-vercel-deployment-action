"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDeployment_1 = require("./getDeployment");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const args = {
    vercelToken: process.env.VERCEL_TOKEN,
    vercelOrgId: process.env.VERCEL_ORG_ID,
    vercelProjectId: process.env.VERCEL_VERCEL_PROJECT_ID,
    githubBranch: process.env.GITHUB_REF_NAME,
    githubCommit: process.env.GITHUB_SHA,
    startTimeout: parseInt(process.env.START_TIMEOUT),
    finishTimeout: parseInt(process.env.FINISH_TIMEOUT),
    paginationLimit: parseInt(process.env.PAGINATION_LIMIT),
    wait: process.env.WAIT === 'true',
};
(0, getDeployment_1.getDeployment)(args).then(console.log);
