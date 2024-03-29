import { useState } from "react";
import "./App.css";

function App() {
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [afnPriceStr, setAfnPriceStr] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [fullfillmentFee, setFullfillmentFee] = useState(null);
  const [storageFee, setStorageFee] = useState(null);

    const query = {
      countryCode: "DE",
      itemInfo: {
        tRexId: "12446",
        packageWeight: packageWeight,
        dimensionUnit: "centimeters",
        weightUnit: "kilograms",
        packageLength: packageLength,
        packageWidth: packageWidth,
        packageHeight: packageHeight,
        afnPriceStr: afnPriceStr,
        mfnPriceStr: afnPriceStr,
        mfnShippingPriceStr: shippingPrice,
        currency: "EUR",
        isNewDefined: true,
      },
      programIdList: ["Core", "MFN"],
      programParamMap: {},
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      query.itemInfo.packageWeight = packageWeight;
      query.itemInfo.packageLength = packageLength;
      query.itemInfo.packageWidth = packageWidth;
      query.itemInfo.packageHeight = packageHeight;
      query.itemInfo.afnPriceStr = afnPriceStr;
      query.itemInfo.mfnPriceStr = afnPriceStr;
      query.itemInfo.mfnShippingPriceStr = shippingPrice;
      const anywhereUrl = "https://cors-anywhere.herokuapp.com/"
    const corsAnywhereUrl = "https://web-production-5608.up.railway.app/";
    const apiUrl =
      "https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=DE";
       await fetch(
        "https://cors-anywhere.herokuapp.com/https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=DE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5173",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
          body: JSON.stringify(query), 
        }
      )
      .then((res) =>   res.json())
      .then((obj) => {
        setFullfillmentFee(obj.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount)
        setStorageFee(obj.data.programFeeResultMap.Core.perUnitNonPeakStorageFee.total.amount)
      })
      .catch(err => console.error(err))
  
      document.getElementById('result-fee').style.opacity = 1
    };
  return (
    <div className="container">
      <h1>Amazon Revenue Calculator</h1>
      <form action="POST" className="form-container" onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="packageWeight">Package Weight</label>
          <input
            type="text"
            name="packageWeight"
            id="packageWeight"
            placeholder="Напишите вес груза"
            value={packageWeight}
            onChange={(e) => setPackageWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageLength">Package Length</label>
          <input
            type="text"
            name="packageLength"
            id="packageLength"
            placeholder="Напишите длину груза"
            value={packageLength}
            onChange={(e) => setPackageLength(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageWidth">Package Width</label>
          <input
            type="text"
            name="packageWidth"
            id="packageWidth"
            placeholder="Напишите ширину груза"
            value={packageWidth}
            onChange={(e) => setPackageWidth(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="packageHeight">Package Height</label>
          <input
            type="text"
            name="packageHeight"
            id="packageHeight"
            placeholder="Напишите высоту груза"
            value={packageHeight}
            onChange={(e) => setPackageHeight(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="afnPriceStr">Price</label>
          <input
            type="text"
            name="afnPriceStr"
            id="afnPriceStr"
            placeholder="Цена груза"
            value={afnPriceStr}
            onChange={(e) => setAfnPriceStr(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label htmlFor="mfnShippingPriceStr">Shipping Price</label>
          <input
            type="text"
            name="mfnShippingPriceStr"
            id="mfnShippingPriceStr"
            placeholder="Цена доставки груза"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            required
          />
        </div>
        <div className="buttons-form">
          <button type="submit" className="btn">
            Count fees
          </button>
          <button
            type="submit"
            className="btn"
            onClick={() => window.location.reload()}
          >
            Reset fees
          </button>
        </div>
      </form>
      <div id="result-fee">
        <p>
          Fullfillment Fee: {fullfillmentFee ? fullfillmentFee : "0"} € <br />{" "}
          Storage Fee: {storageFee ? storageFee : "0"} €
        </p>
      </div>
    </div>
  );
}

export default App;
