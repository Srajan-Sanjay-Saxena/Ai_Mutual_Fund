import { Router, type IRouter } from 'express';
import * as controller from '../controller/mutualFund.controller.js';



export const mutualFundRoutes = new Map<string, string>();
mutualFundRoutes.set('mutualFund/recommendations' , 'mutualFund/recommendations');
mutualFundRoutes.set("mutualFund/analytics" , "mutualFund/analytics");
mutualFundRoutes.set("mutualFund/filters" , "mutualFund/filters");
mutualFundRoutes.set("mutualFund/:id" , "mutualFund/:id");