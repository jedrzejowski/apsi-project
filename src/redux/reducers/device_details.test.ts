import {v4 as uuid} from 'uuid';
import {DataT} from "../../types";
import {makeAction} from "../actions";
import {deviceDetailsSelector} from "./device_details";
import createMockStore, {MockStoreI} from "../createMockStore";

describe('redux/device_details', function () {
    let mock_store: MockStoreI;

    beforeEach(() => {
        mock_store = createMockStore();
    })

    it('set_one', function () {

        let device1 = {
            deviceId: uuid()
        } as DataT.DeviceDetails;

        mock_store.dispatch(
            makeAction("DEVICE_DETAILS_SET", device1)
        );

        let device2 = deviceDetailsSelector(mock_store.getState(), device1.deviceId);

        expect(device2).toEqual(device1);
    });
});