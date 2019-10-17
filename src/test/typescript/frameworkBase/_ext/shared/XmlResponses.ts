export class XmlResponses {

    static EVAL_1 = `
    <partial-response>
    <changes>
        <eval><![CDATA[
            document.getElementById('evalarea1').innerHTML = 'eval test succeeded';
        ]]></eval>
    </changes>
    </partial-response>
    `;


    static UPDATE_INSERT_1 = `
    <partial-response>
    <changes>
        <update id="changesArea"><![CDATA[
        <div id='changesArea'>update succeeded 1</div><script type='text/javascript'>document.getElementById('evalarea2').innerHTML='embedded script at update succeed';</script>
        ]]></update>
        <insert id="inserted1" before="changesArea"><![CDATA[
            <div id='insertbefore'>insert before succeeded should display before test1</div><script type='text/javascript'>document.getElementById('evalarea3').innerHTML='embedded script at insert succeed';</script>
        ]]></insert>
        <insert id="inserted2" after="changesArea"><![CDATA[
            <div  id='insertafter'>insert after succeeded should display after test1</div>
        ]]></insert>
    </changes>
    </partial-response>
    `;

    static UPDATE_INSERT_2 = `
    <partial-response>
    <changes>
        <update id="changesArea"><![CDATA[
        <div id='changesArea'>update succeeded 2</div><script type='text/javascript'>document.getElementById('evalarea2').innerHTML='embedded script at update succeed';</script>
        ]]></update>
        <insert id="inserted1" before="changesArea"><![CDATA[
            <div id='insertbefore'>insert before succeeded should display before test1</div><script type='text/javascript'>document.getElementById('evalarea3').innerHTML='embedded script at insert succeed';</script>
        ]]></insert>
        <insert id="inserted2" after="changesArea"><![CDATA[
            <div  id='insertafter'>insert after succeeded should display after test1</div>
        ]]></insert>
    </changes>
    </partial-response>
    `;

    static DELETE_1 = `
    <partial-response>
    <changes>
        <delete id="deletable"></delete>
    </changes>
    </partial-response>
    `;

    static VIEWSTATE_1 = `
    <partial-response>
    <changes>
        <update id="javax.faces.ViewState"><![CDATA[<hello world]]></update>
    </changes>
    </partial-response>
    `;

    static ATTRIBUTE_CHANGE = `
    <partial-response>
    <changes>
        <attributes id="attributeChange">
            <attribute name="style" value="color:rgb(100,100,100);"></attribute>
            <attribute name="style" value="border:1px solid black;"></attribute>
            <attribute name="onclick" value="document.getElementById('evalarea4').innerHTML = 'attributes onclick succeeded';"></attribute>
        </attributes>
    </changes>
    </partial-response>
    `;

    static ERROR_1 = `
    <partial-response>
    <changes>
        <error>
            <error-name>Error1</error-name>    
            <error-message><![CDATA[Error1 Text]]></error-message>    
        </error>
    </changes>
    </partial-response>
    `;
    static ERROR_2 = `
    <partial-response>
    <changes>
        <error>
            <error-name>Erro21</error-name>    
            <error-message><![CDATA[Error2 Text]]></error-message>    
        </error>
    </changes>
    </partial-response>
    `;

    static ILLEGAL_RESP = `>>>> xxxx >YYYY-!->>>`;
}