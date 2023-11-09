//Package Declaration
const { poolPromise, sql } = require('./dbconfig');

//Cheetukali Summary
async function cheetukaliSummary() {
    const conn = await poolPromise.getConnection();
    try {
        let callSP = 'CALL WG_CheetukaliList_Summary()';
        let result = await conn.execute(callSP);

        if (result) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//Cheetukali Family Summary
async function cheetukaliFamilySummary() {
    const conn = await poolPromise.getConnection();
    try {
        let callSP = 'CALL WG_CheetukaliList_Family_Summary()';
        let result = await conn.execute(callSP);

        if (result) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}


//Cheetukali List
async function cheetukaliList() {
    const conn = await poolPromise.getConnection();
    try {
        let callSP = 'CALL WG_CheetukaliList()';
        let result = await conn.execute(callSP);

        if (result) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//Cheetukali List Deatils All
async function cheetukaliDetailsAll() {
    const conn = await poolPromise.getConnection();
    try {
        let callSP = 'CALL WG_CheetukaliDetailsAll()';
        let result = await conn.execute(callSP);

        if (result) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//CheetukaliListGroupByMonth
async function cheetukaliListGroupByMonth() {
    const conn = await poolPromise.getConnection();
    try {
        let callSP = 'CALL WG_CheetukaliListMonthly_json()';
        let result = await conn.execute(callSP);

        if (result) {
            //console.log(result[0][0][0]);
            //console.log(result[0][0][0].v_json);
            //console.log(JSON.stringify(result[0][0][0].v_json));
            return result[0][0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//Cheetukali Deatails by ID
async function cheetukaliDetails(wgId) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pwgId: wgId };
        let callSP = 'CALL WG_CheetukaliDetails(:pwgId)';
        let result = await conn.execute(callSP, params);

        if (result[0][0].length !== 0) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//User List
async function userList(type) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { userType: type };
        let callSP = 'CALL WG_UserList(:userType)';
        let result = await conn.execute(callSP, params);

        if (result[0][0].length !== 0) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return null; //err.message;
    }
    finally {
        conn.release();
    }
}

//Login
async function WgLogin(UserID, Password) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pUserID: UserID, pPassword: Password };
        let callSP = 'CALL WG_Login(:pUserID,:pPassword)';
        let result = await conn.execute(callSP, params);


        if (result[0][0].length !== 0) {
            //console.log(result[0][0]);
            return result[0];
        } else {
            return null
        }
    }
    catch (err) {
        return err.message;
    }
    finally {
        conn.release();
    }
}

//addEvent
async function addEvent(bodyjsonstring) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pbodyjsonstring: bodyjsonstring };
        let callSP = 'CALL WG_AddEvent(:pbodyjsonstring, @rowCount)';
        let result = await conn.execute(callSP, params);
        let outResult = await conn.execute('SELECT @rowCount as rowCount');

        //console.log(outResult[0][0].rowCount);

        if (outResult[0].length !== 0) {
            return outResult[0][0].rowCount;
        } else {
            return null
        }
    }
    catch (err) {
        return null; //err.message;
    }
    finally {
        conn.release();
    }
}

//addWinner
async function addWinner(bodyjsonstring) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pbodyjsonstring: bodyjsonstring };
        let callSP = 'CALL WG_AddWinner(:pbodyjsonstring, @rowCount)';
        let result = await conn.execute(callSP, params);
        let outResult = await conn.execute('SELECT @rowCount as rowCount');

        //console.log(outResult[0][0].rowCount);

        if (outResult[0].length !== 0) {
            return outResult[0][0].rowCount;
        } else {
            return null
        }
    }
    catch (err) {
        return null; //err.message;
    }
    finally {
        conn.release();
    }
}

//delWinner
async function delWinner(bodyjsonstring) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pbodyjsonstring: bodyjsonstring };
        let callSP = 'CALL WG_DelWinner(:pbodyjsonstring, @rowCount)';
        let result = await conn.execute(callSP, params);
        let outResult = await conn.execute('SELECT @rowCount as rowCount');

        //console.log(outResult[0][0].rowCount);

        if (outResult[0].length !== 0) {
            return outResult[0][0].rowCount;
        } else {
            return null
        }
    }
    catch (err) {
        return null; //err.message;
    }
    finally {
        conn.release();
    }
}

//delEvent
async function delEvent(wgid) {
    const conn = await poolPromise.getConnection();
    try {
        let params = { pwgId: wgid };
        let callSP = 'CALL WG_DelEvent(:pwgId, @rowCount)';
        let result = await conn.execute(callSP, params);
        let outResult = await conn.execute('SELECT @rowCount as rowCount');

        //console.log(outResult[0][0].rowCount);

        if (outResult[0].length !== 0) {
            return outResult[0][0].rowCount;
        } else {
            return null
        }
    }
    catch (err) {
        return null; //err.message;
    }
    finally {
        conn.release();
    }
}

module.exports = {
    cheetukaliSummary: cheetukaliSummary,
    cheetukaliFamilySummary: cheetukaliFamilySummary,
    cheetukaliList: cheetukaliList,
    cheetukaliDetailsAll: cheetukaliDetailsAll,
    cheetukaliListGroupByMonth: cheetukaliListGroupByMonth,
    cheetukaliDetails: cheetukaliDetails,
    userList: userList,
    WgLogin: WgLogin,
    addEvent: addEvent,
    addWinner: addWinner,
    delWinner: delWinner,
    delEvent: delEvent
}
