"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployment = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const ts_retry_promise_1 = require("ts-retry-promise");
function getDeployment({ vercelToken, vercelOrgId, vercelProjectId, githubBranch, githubCommit, startTimeout, finishTimeout, wait, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const deployment = yield (0, ts_retry_promise_1.retry)(() => __awaiter(this, void 0, void 0, function* () {
            console.log("Finding deployment...");
            let until = null;
            while (true) {
                let url = `https://api.vercel.com/v6/deployments?teamId=${vercelOrgId}&projectId=${vercelProjectId}`;
                if (until) {
                    url += `&until=${until}`;
                }
                const response = yield (0, cross_fetch_1.default)(url, {
                    headers: {
                        Authorization: `Bearer ${vercelToken}`,
                    },
                    method: "get",
                });
                const result = (yield response.json());
                const deployment = result.deployments.find((d) => d.meta.githubCommitRef === githubBranch && d.meta.githubCommitSha === githubCommit);
                if (deployment) {
                    return deployment;
                }
                if (result.pagination.next) {
                    until = result.pagination.next;
                }
                else {
                    break;
                }
            }
            throw new Error('Deployment not found');
        }), { timeout: startTimeout * 1000, delay: 1000 });
        return deployment;
    });
}
exports.getDeployment = getDeployment;
