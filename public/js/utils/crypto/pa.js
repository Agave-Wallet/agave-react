
function createDeckSpawn(version,name,issue_mode,number_of_decimals,asset_specific_data){
    window.protobuf.load("peerassets.proto", function(err,root)){
        if (err){
            throw err;
        }

        const DeckMessage = root.lookupType("DeckSpawn");
        const payload = {
            version: version,
            name: name,
            issue_mode:issue_mode,
            number_of_decimals:number_of_decimals,
            asset_specific_data:asset_specific_data
            }
        
        const message = DeckMessage.create(payload)
        const buffer = DeckMessage.encode(message).finish()
        return buffer

    }
}

exports (createDeckSpawn);