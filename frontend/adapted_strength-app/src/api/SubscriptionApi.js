import { HttpStatus, ApiUtils } from "./ApiUtils";

export class SubscriptionApi {


    /**
     * Get the client stripe session secret based on the given plan.
     * @param plan: the plan the user is trying to subscribe to
     * @return promise
     */
     static getClientSecret({plan}){
      return ApiUtils.apiPost(`payments/create_checkout_session/${plan}`)
        .then((response) => {
          if (response.status === HttpStatus.OK) {
            return response.data.payload;
          }
        })
        .catch((error) => {
          console.log("BIGTIME ERROR: " + error);
          return Promise.reject();
        });

     }
}