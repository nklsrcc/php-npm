import {AppApiClient} from '../Api/Client';

export class DataHandlerLayer {
    protected client: AppApiClient = AppApiClient.getInstance();
}