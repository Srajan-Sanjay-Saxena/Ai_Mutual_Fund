import * as controller from "../controller/mutualFund.controller.js";
import { Router, type IRouter } from "express";

const mutualFundRouter: IRouter = Router();

mutualFundRouter.post("/recommendations", controller.getRecommendations);
mutualFundRouter.get("/analytics", controller.getAnalytics);
mutualFundRouter.get("/filters", controller.getFilters);
mutualFundRouter.get("/all", controller.getAllFunds);
mutualFundRouter.get("/:id", controller.getFundDetails);

export { mutualFundRouter };