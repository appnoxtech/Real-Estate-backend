import { PropertyService } from "../modules/properties/services/propService";
import PropertiesType  from "../modules/properties/models/propertyTypeModel"
import { logger } from "../utils/logger";
import { error } from "console";
require('@babel/preset-typescript')
const { v4: uuidv4 } = require('uuid');

let propertiesInstance = new PropertyService();
let propertiesBody = {
    body: {
        id: uuidv4(),
        title:"Xaviers",
        userId:"ccb4ba05-d6a9-442a-bda7-c51479782a7b",
        propertyType:"Commertial-property",
        description:"hello",
        price:"2500",
        bhk:"1bhk",
        status:"readyToMove",
        lookingTo:"Buy",
        furnishedStatus:"unfurnished",
        ownerName:"adgsdfg",
        ownerPhoneNumber:"7355072586",
        area:"23 sqft",
        propertyOnFloor:"12",
        totalFloor:"20"
    }

};
let request = {
    query: { search: '' },
    body: {
        id: uuidv4(),
        title:"Xaviers",
        userId:"ccb4ba05-d6a9-442a-bda7-c51479782a7b",
        propertyType:"Commertial-property",
        description:"hello",
        price:"2500",
        bhk:"1bhk",
        status:"readyToMove",
        lookingTo:"Buy",
        furnishedStatus:"unfurnished",
        ownerName:"adgsdfg",
        ownerPhoneNumber:"7355072586",
        area:"23 sqft",
        propertyOnFloor:"12",
        totalFloor:"20"
    },
};

const res = {}

describe("Properties test cases", () => {
    test("creating properties test cases", async () => {
        let properties = await propertiesInstance.registerProperty(propertiesBody, res)
        expect(properties).toHaveProperty('title');
        expect(properties).toHaveProperty('type');
        expect(properties).toHaveProperty('location');
        expect(properties).toHaveProperty('furnishedStatus');
    });
    test("create property for existing title", async () => {
        try {
            let properties = await propertiesInstance.registerProperty(propertiesBody, res)
        } catch (err: any) {
            expect(err.message).toBe('property already exist with this title.')
        }
    })
    test("get all properties", async () => {
        let allData = await propertiesInstance.readAllPropertiesDetails(request)
        expect(allData.rows.length).not.toBe(0)
    })
    test("get properties by id", async () => {
        try {
            const req = { params: { propertyId: "e95c0d26-2128-4430-baa3-0f9883a0f2bc" } }
            const result = await propertiesInstance.getPropertyDetailsById(req)
        } catch (error: any) {
            expect(error.message).toBe("property not found.")
        }
    })
    test("get properties by userId", async () => {
        try {
            const req = { params: { userId: "76080e47-51b4-4ff7-9631-d35459b2f894" } }
            const result = await propertiesInstance.getPropertyByUserId(req)
        } catch (error: any) {
            expect(error.message).toBe("Property not found for this userId")
        }
    })
    test("update properties details", async () => {
        const req = {
            params: { id: "76080e47-51b4-4ff7-9631-d35459b2f894" },
            body: { title: "data01"}
        };
        try{
        let updateProperties = await propertiesInstance.updatePropertyDetails(req)
        }catch(error:any){
            expect(error.message).toBe('property not exist, So we can not update the property details ')
        }
    })
    test("delete propeties by using property Id",async()=>{
        const req={params:{id:"76080e47-51b4-4ff7-9631-d35459b2f894"}}
        try{
        const result = await propertiesInstance.deleteProperty(req)
        }catch(error:any){
            expect(error.message).toBe("property not found")
        }
    })

    test("get all data of propertyType",async()=>{
        try{
      let data = await PropertiesType.findAll()
      expect(data.length).not.toBe(0)
        }catch(err:any){
          expect(err.message).toBe("No DATA Found")
        }
    })
})