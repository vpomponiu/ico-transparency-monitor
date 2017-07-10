const BigNumber = require('bignumber.js');
const html2canvas = require('html2canvas');

export const tokenHoldersPercentage = (total , investors, percentages) =>{
    let investorsArray = [];
    Object.keys(investors).map((key)=>{
        investorsArray.push({
            investor : key,
            tokens : investors[key].tokens
        })
    });
    investorsArray.sort((first , last)=> {
        return last.tokens - first.tokens;
    });

    let result = [];
    percentages.map((percentageElement)=>{

        const percentage = investorsArray.length*percentageElement;
        let percentageAmount = new BigNumber(0);

        for (let i = 0 ; i < parseInt(percentage); i ++){
            percentageAmount = percentageAmount.plus(investorsArray[i].tokens.toFixed(3));
        }
        let internalResult = {};
        internalResult[percentageElement] =new BigNumber((percentageAmount*100).toFixed(3)).dividedBy(total.toFixed(3)).valueOf();
        result.push({name : `${percentageElement*100}%` , amt:parseFloat(internalResult[percentageElement]) , TokenHolders: parseFloat(internalResult[percentageElement])});
    });
    return result;
};

export const downloadChartImage = (chartId) => {
    const div= document.getElementById(chartId);

    const watermark = '<h1>Neufund</h1>';
    const rect = div.getBoundingClientRect();

    const canvas = document.createElement("canvas");

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font="30px Verdana";

    const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","#424344");
    gradient.addColorStop("0.5","#D9DBDC");
    gradient.addColorStop("1.0","#D4E20F");

    // Fill with gradient
    ctx.fillStyle=gradient;
    ctx.fillText("Powered by Neufund",
        canvas.width/2 - 90
        ,40
    );
    ctx.translate(-rect.left,-rect.top);

    html2canvas(div, {
        canvas:canvas,
        height:rect.height,
        width:rect.width,
        onrendered: function(canvas) {
            const image = canvas.toDataURL("image/png");

            window.open(image);
        }
    });
};