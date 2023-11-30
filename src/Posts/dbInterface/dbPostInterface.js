

const db    = require("./../../../dbcontroller");

const dbcommoninterface = require("./../../../dbInterface.js");

    ///<summary>
    // add new post hide into db
    ///</summary>
    async function posthide(hp){

        let postresult = await selectHide(hp);
        if(0 === postresult.result.length){
            postresult = await insertHide(hp);
        }else if(0 < postresult.result.length){
            postresult = await updateHide(hp);
        }

        let lstofPosts = await dbcommoninterface.getlstPosts({"user_id": hp.user_id});
        return lstofPosts;
    }

    ///<summary>
    // add new post hide into db
    ///</summary>
    async function insertHide(hp){
        const insertQuery = "INSERT INTO public.md_user_hidden_post(user_id, post_id, is_active, created_date, updated_date)VALUES (" + hp.user_id +"," + hp.post_id +",1,current_date, current_timestamp)";
        const insertresult = await db.Insert(insertQuery);
        if(200 != insertresult.status){
            throw "failed insert query";
        }
        return(insertresult);
    }

    ///<summary>
    // add new post hide into db
    ///</summary>
    async function selectHide(hp){
        const selectQuery = "select user_id, post_id, is_active from public.md_user_hidden_post where user_id =" + hp.user_id +" and post_id =" + hp.post_id;
        const selectResult = await db.Select(selectQuery);
        if(200 != selectResult.status){
            throw "failed insert query";
        }
        return(selectResult);
    }
    
    ///<summary>
    // add new post hide into db
    ///</summary>
    async function updateHide(hp){
        const updateQuery = "update public.md_user_hidden_post set is_active = " + hp.is_active + " where user_id = " + hp.user_id + " and post_id =" +hp.post_id;
        const updateResult = await db.Update(updateQuery);
        if(200 != updateResult.status){
            throw "failed insert query";
        }
        return(updateResult);
    }

        ///<summary>
    // add new post hide into db
    ///</summary>
    async function postreportcomment(prc){

        let prcQuery   = "insert into public.md_user_report_post (post_id, reporter_user_id, reason, is_active, created_date, updated_date)values(" + prc.post_id + "," + prc.reporter_user_id + ",'"  + prc.reason + "',1, current_date, current_timestamp)";
        let prcResult  = await db.Insert(prcQuery);
        if(200 !== prcResult.status){
            throw "failed to inset post report comment"
        }
        return prcResult;
    }


module.exports = {posthide, postreportcomment}