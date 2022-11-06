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
const core = __importStar(require("@actions/core"));
try {
    console.log('one');
    const args = {
        vercelToken: core.getInput("vercel-token"),
        vercelOrgId: core.getInput("vercel-org-id"),
        vercelProjectId: core.getInput("vercel-project-id"),
        githubBranch: core.getInput("github-branch"),
        githubHash: core.getInput("github-hash"),
        startTimeout: core.getInput("start-timeout"),
        finishTimeout: core.getInput("finish-timeout"),
        wait: core.getInput("wait"),
    };
    console.log('two');
    console.log(args);
    core.setOutput("deployment-url", "todo");
}
catch (error) {
    console.error(error);
    core.setFailed(error.message);
}
