// to be run on https://isis-cs.prod.cu.edu/psc/csprod/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL
// aesthetic improvements to show more information on the schedule than it normally does
// collects classes enrolled in from the schedule and from the "meeting information not available" section
// demonstrates how to access the full information for each course rendered in the schedule
// of note is that the printer friendly page ignores classes for which the meeting information is unavailable

for( var undetailed of document.querySelectorAll( ".ui-icon-checkbox-off" ) )
    undetailed.click();

document.querySelector( "#DERIVED_CLASS_S_MEETING_TIME_START" ).value = "0:01";
document.querySelector( "#DERIVED_CLASS_S_MEETING_TIME_END" ).value = "23:59";

document.querySelector( "#DERIVED_CLASS_S_SSR_REFRESH_CAL\\$38\\$" ).click();

var classes = {};

function renderBetter()
{
    if( loader.bInProcess ){ setTimeout( renderBetter, 500 ); return; }
    [].forEach.call( document.getElementsByClassName( "weekly-schedule-class" ), function( a )
    {
        a.innerHTML = $( document ).contents().find( id=(s=a.getAttribute( "onclick" )).substring( s.indexOf( "#" ), s.indexOf( "))" ) - 1 ) )[0].innerHTML;
        classes[ id.substring( 1, "#DEPT-0000-000".length ).replace( /-/, "" ).toLowerCase() ] = true;
        a.style.setProperty( "font-size", "9px", "important" );
        a.style.setProperty( "font-weight", "bold" );
        a.style.setProperty( "line-height", ".95", "important" );
        a.style.setProperty( "padding-top", "5px" );
    } );
    [].forEach.call( document.getElementById( "WEEKLY_SCHED_HTMLAREA" ).getElementsByTagName( "br" ), function( e )
    {
        e.style.setProperty( "content", "" );
        e.style.setProperty( "margin", "2em" );
        e.style.setProperty( "font-size", "24%" );
        e.style.setProperty( "line-height", ".1", "important" );
    } );

    if( document.querySelector( "#win0divSTDNT_WK_NO_MTG\\$0" ) )
        for( var timelessClass of [ ...document.querySelector( "#win0divSTDNT_WK_NO_MTG\\$0" ).querySelectorAll( "tr" ) ].filter( tr => tr.id.split( "$" )[0] == "trSTDNT_WK_NO_MTG" ) )
            classes[ timelessClass.innerText.match( /[A-Z]{4} \d{4} - \d{3}/ )[0].replace( / /, "" ).replace( / - /, "-" ).toLowerCase() ] = true;

    console.log( classes );
    console.log( "Copy this back to CUSchedule:", Object.keys( classes ).join( "," ) );
    prompt( "Copy this back to CUSchedule (Ctrl+C, Enter):", Object.keys( classes ).join( "," ) );
}

renderBetter();



/* // the following does purely aesthetic improvements without collecting class information
for( var undetailed of document.querySelectorAll( ".ui-icon-checkbox-off" ) )
	undetailed.click();

document.querySelector( "#DERIVED_CLASS_S_MEETING_TIME_START" ).value = "0:01";
document.querySelector( "#DERIVED_CLASS_S_MEETING_TIME_END" ).value = "23:59";

document.querySelector( "#DERIVED_CLASS_S_SSR_REFRESH_CAL\\$38\\$" ).click();

function renderBetter()
{
	if( loader.bInProcess ){ setTimeout( renderBetter, 500 ); return; }
    [].forEach.call( document.getElementsByClassName( "weekly-schedule-class" ), function( a )
    {
        a.innerText = $( document ).contents().find( (s=a.getAttribute( "onclick" )).substring( s.indexOf( "#" ), s.indexOf( "))" ) - 1 ) )[0].innerText;
        a.style.setProperty( "font-size", "9px", "important" );
        a.style.setProperty( "font-weight", "bold" );
        a.style.setProperty( "line-height", ".95", "important" );
        a.style.setProperty( "padding-top", "5px" );
    } );
    [].forEach.call( document.getElementById( "WEEKLY_SCHED_HTMLAREA" ).getElementsByTagName( "br" ), function( e )
    {
        e.style.setProperty( "content", "" );
        e.style.setProperty( "margin", "2em" );
        e.style.setProperty( "font-size", "24%" );
        e.style.setProperty( "line-height", ".1", "important" );
    } );
}

renderBetter();
*/