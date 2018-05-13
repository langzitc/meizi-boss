export default {
    getPriceForAttribute(advancedPrices, selectedAttributes) {
         let price = 0
         advancedPrices.map((advancedPrice)=>{
            let isMatch = true;
            for(let attributeCode in advancedPrice.attributes) {
                let attribute = advancedPrice.attributes[attributeCode];
                if(parseFloat(attribute.value) != parseFloat(selectedAttributes[attributeCode])) {
                    isMatch = false;
                }
            }
            if(isMatch) {
                price = advancedPrice.price;
            }
        });
        return price;
    },

}