import { useState } from "react";
import "./App.css";
import { BounceLoader } from "react-spinners";

function App() {
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [afnPriceStr, setAfnPriceStr] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [fullfillmentFee, setFullfillmentFee] = useState(null);
  const [storageFee, setStorageFee] = useState(null);
  const [countryCode, setCountryCode] = useState("")
  const [tRexId, setTRexId] = useState("")
  const [currency, setCurrency] = useState("")
  const [loading, setLoading] = useState(false)

  const onCountryCodeHandle = (country) => {
    if(country == "DE" || country == "FR" || country == "IT" || country == "ES") {
      setCurrency("EUR")
    } else if (country == "GB") {
      setCurrency("GBP")
    } else {
      setCurrency("PLN")
    }
  }

  const checkTRexId = (tRex) => {
    switch (tRex) {
      case "GB":
       return setTRexId("12110");
      case "DE":
      return  setTRexId("12402");
      case "FR":
      return  setTRexId("12710");
      case "IT":
      return  setTRexId("13010");
      case "ES":
      return  setTRexId("13303");
      case "PL":
      return  setTRexId("15102");
    }
  }

    const query = {
      countryCode: countryCode,
      itemInfo: {
        tRexId: tRexId,
        packageWeight: packageWeight,
        dimensionUnit: "centimeters",
        weightUnit: "kilograms",
        packageLength: packageLength,
        packageWidth: packageWidth,
        packageHeight: packageHeight,
        afnPriceStr: afnPriceStr,
        mfnPriceStr: afnPriceStr,
        mfnShippingPriceStr: shippingPrice,
        currency: currency,
        isNewDefined: true,
      },
      programIdList: ["Core", "MFN"],
      programParamMap: {},
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      document.getElementById("result-container").style.opacity = 1
      setLoading(true)
      query.countryCode = countryCode;
      query.itemInfo.currency = currency;
      query.itemInfo.tRexId = tRexId;
      query.itemInfo.packageWeight = packageWeight;
      query.itemInfo.packageLength = packageLength;
      query.itemInfo.packageWidth = packageWidth;
      query.itemInfo.packageHeight = packageHeight;
      query.itemInfo.afnPriceStr = afnPriceStr;
      query.itemInfo.mfnPriceStr = afnPriceStr;
      query.itemInfo.mfnShippingPriceStr = shippingPrice;

      const railwayUrl = "https://web-production-43a4.up.railway.app/"
    const apiUrl =
      `https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=${countryCode}`;
       return fetch(
        `${railwayUrl}${apiUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://myamazonrequest.netlify.app/",
           
            "Access-Control-Allow-Methods": "GET",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
          body: JSON.stringify(query), 
        }
      )
      .then((res) =>   res.json())
      .then((obj) => {
        setFullfillmentFee(obj.data.programFeeResultMap.Core.otherFeeInfoMap.FulfillmentFee.total.amount)
        setStorageFee(parseFloat(obj.data.programFeeResultMap.Core.perUnitNonPeakStorageFee.total.amount).toFixed(2))
      setLoading(false)
      })
      .catch(err => console.error(err))
  
    };
  return (
    <div className="container">
      <h1 className="form-title">Amazon Revenue Calculator</h1>
      <form action="POST" className="form-container" onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="packageWeight">Package Weight</label>
          <input
            type="number" pattern="[0-9]*"
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
            type="number" pattern="[0-9]*"
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
            type="number" pattern="[0-9]*"
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
            type="number" pattern="[0-9]*"
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
            type="number" pattern="[0-9]*"
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
            type="number" pattern="[0-9]*"
            name="mfnShippingPriceStr"
            id="mfnShippingPriceStr"
            placeholder="Цена доставки груза"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-item">
          <label >Country code</label>
          <select  value={countryCode} onChange={e => {
            setCountryCode(e.target.value);
            onCountryCodeHandle(e.target.value);
            checkTRexId(e.target.value)
            console.log(e.target.value)
            document.getElementById("result-container").style.opacity = 0
            document.getElementById("count-button").disabled = false

          }}
          >
            <option  value="" disabled>Выберите страну</option>
            <option  value="DE">DE</option>
            <option  value="GB">GB</option>
            <option  value="FR">FR</option>
            <option  value="IT">IT</option>
            <option  value="ES">ES</option>
            <option  value="PL">PL</option>
            
          </select>
          
        </div>
        <div className="buttons-form">
          <button type="submit" className="btn" id="count-button" disabled>
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
       <div id="result-container">
       {loading ? (<div className="loader">
        <BounceLoader color="#36d7b7" />
       </div>)
       : (
      <div id="result-fee">
        <p>
        Fullfillment Fee: {fullfillmentFee ? fullfillmentFee + " " + currency : "0"}  <br />{" "}
        Storage Fee: {storageFee ? storageFee + " " + currency : "0"} 
      </p>
      </div>
       )}
       </div>
      
    </div>
  );
}

export default App;
