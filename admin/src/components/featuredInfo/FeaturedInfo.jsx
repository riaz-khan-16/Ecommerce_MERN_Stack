




import "./featuredInfo.css";   
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";  //read
import { useEffect, useState } from "react";                   // read
import { userRequest } from "../../requestMethods";          // made for calling api

export default function FeaturedInfo() {                         
  const [income, setIncome] = useState([]);  // income can be changed in setIncome function
  const [perc, setPerc] = useState(0); //perc can be changed in setPerc method




  useEffect(() => {                 // what will show the component after rendering is set by uesEffect
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");// confused
        setIncome(res.data);  // taking the data from response      
        setPerc((res.data[1].total * 100) / res.data[0].total - 100); // taking the data from response
      } catch {}
    };
    getIncome();
  }, []);


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>  
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
