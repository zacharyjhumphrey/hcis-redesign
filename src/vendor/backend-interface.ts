import { ComponentFactoryResolver } from "@angular/core";
import * as $ from "jquery";
import { AnnouncementsItem, AnnouncementsSection, Reading } from '../common';

//  https://honors.uca.edu/hcis/stu/stuPage950.inc.php?cmd=tabWrite&pageTab=950
const HOME_RESPONSE = `
<div id="tabContent" style="padding:5px;">
<div id="did_sec">
<input type="hidden" name="referTab" value="040" id="iid_referTab">
<input type="hidden" name="sendTab" value="040" id="iid_sendTab">
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken">
</div>
	<style>	
		a:link		{	color: #00f;	text-decoration: none;	}
		a:visited	{	color: #00f;	text-decoration: none;	} 
		a:active 	{	color: #f00;}
		a:hover		{	color: #f00;	text-decoration: underline;	}

		.emWrap { width: auto; border: 1px black solid; background-color: #f8f8f8; margin:auto; padding: 20px;	}
//		.emWrap { width: 700px; border: 1px black solid; background-color: #f8f8f8; margin:auto; padding: 20px;	}
		.emHead {font-size:18px;font-weight:bold;padding:4px;font-family:serif;font-variant:small-caps;}
		.emSection {font-size:15px;font-weight:bold;color:#818a8f ;border-style: solid;border-width:6px 0;border-color:#006b54;padding: 2px; margin:10px; }
		.emDate {font-size: 14px;color: #26354a; font-weight:bold;font-variant:small-caps;text-decoration: underline;padding:3px 0 3px 10px; }
		.emLocation {font-size: 14px;color: #26354a; font-variant:small-caps;padding:0px 0 3px 10px; }
		.emItem {font-size: 12px; padding: 0px 25px 15px 25px;  }
		.emNL {line-height:50%;}
		</style><div class="emWrap">
<div class="emHead">Schedler Honors College Calendar</div>
<div class="emHead">Sunday, November 6, 2022</div>
<div class="emSection">Events</div>
<div class="emDate">Friday, November 11, 2022 - 6:00 PM</div><div class="emLocation">HPER, large studio, 2nd floor</div><div class="emItem"><b>Dancing Bears Contra</b> - Join us for the third Dancing Bears Contra Dance of the fall with live music by the Faulkner County Good Time Band.<br><br class="emNL">Callers: Ellen <br><br class="emNL">Dancers: Y’all!<br><br class="emNL">HPER: 6:00 pm Beginners Lesson. 6:30-8:30 pm - Dance.<br><br class="emNL">Come alone or bring some friends. It’s all good. Gender neutral and totally inclusive.<br><br class="emNL">If you want to bring a non-UCA guest, you are welcome to do so. Be sure to follow the HPER’s guest policy. If you’re unsure if you want to dance, have a seat and enjoy the band. <br><br class="emNL">What is contra dance? Pretty much what you’d get if a square dance married a swing dance. It’s hoots and hollers, laughter and smiles. Community folk dance. Everyone can do it. No prior experience necessary.  Learn more here: <br><br class="emNL"><a href="https://vimeo.com/316215468" target="_blank">https://vimeo.com/316215468</a><br><br class="emNL">Upcoming Dances: December 2nd.<br><br class="emNL">Supported in part by the Gadd/Merrill Fund of the Country Dance and Song Society, the UCA Honors College, and Innovation Media Corp.</div>
<div class="emDate">Friday, November 11, 2022 - 3:00 PM</div><div class="emLocation">Farris Presentation Room</div><div class="emItem"><b>Soapbox</b> - Hypatia Meraviglia: The human relationship with the natural world. A discussion of what has damaged the human-nature relationship, as well as how we can strengthen it.</div>
<div class="emSection">Announcements</div>
<div class="emItem"><b>Wakanda Forever Ticket Pick-up</b> - Honors has bought out a theater for opening night of Wakanda Forever at Conway’s Cinemark. Tickets will be available for pick-up in the honors office beginning Monday, November 7 at 8:30 a.m. <br><br class="emNL">Tickets can be picked up 1 per honors student on Monday and Tuesday, 8:30-4:00, then on Wednesday at 8:30, we’ll begin distributing a second ticket for a single non-honors guest if any tickets remain.</div>
<div class="emItem"><b>SHC Council Sweatshirt orders</b> - SHC Council is taking sweatshirt orders through November 9th: <br><br class="emNL"><a href="http://honors-center-society.square.site/" target="_blank">http://honors-center-society.square.site/</a></div>
<div class="emItem"><b>Focus on a Fellowship</b> - U.S. Student Fulbright awards are an exciting ticket to one academic year spent abroad, all expenses paid, after your undergrad degree is in hand. Several hundred awards to some 130 countries are available annually to study, conduct research, or teach English. Applications are due in early fall, with notifications made the following spring. UCA Honors students have done well in this competition – maybe you’ll be next! Us.fulbrightonline.org</div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
</div>
`

const SENIOR_SEMINAR_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTabSelected" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="formShow" id="collection130_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection130','collection130')">Sr Sem: Democracy, Decision-Making, and the Examined Life<dfn>Doug Corbitt</dfn></div>
<div class="formHide" id="collection130_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection130','collection130')">Sr Sem: Democracy, Decision-Making, and the Examined Life<dfn>Doug Corbitt</dfn></div>
<div id="collection130" style="display:none;" class="w550 shadowed pb9">
<div id="lsyl_2779" class="RecordListAlt1" onclick="ajaxNewWindow('lsyl_2779','cabViewer.php?file=syllabi/syl_2779_20221008_115928.pdf&amp;type=application/pdf&amp;drawer=3256');">Course Syllabus</div>
<div id="ref_43101316" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43101316','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Radical Dignity of Malcolm X<dfn class="author">Peniel E. Joseph</dfn>
<input type="hidden" name="eref" value="43101316" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101317" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43101317','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Radical Citizenship of Martin Luther King<dfn class="author">Peniel E. Joseph</dfn>
<input type="hidden" name="eref" value="43101317" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101318" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43101318','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Renewing the American Democratic Faith<dfn class="author">Stephen C. Rockefeller</dfn>
<input type="hidden" name="eref" value="43101318" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101319" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43101319','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
What Black Women Teach Us About Democracy<dfn class="author">Andra Gillespie and Nadia E. Brown</dfn>
<input type="hidden" name="eref" value="43101319" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101320" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43101320','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Keeping the Republic<dfn class="author">Dan Moulthrop</dfn>
<input type="hidden" name="eref" value="43101320" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101323" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43101323','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Building a University Where All People Matter<dfn class="author">Michael M. Crow et al.</dfn>
<input type="hidden" name="eref" value="43101323" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection69_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection69','collection69')">Sr Sem: Consciousness: The Search for Self and Community Revisited<dfn>Adam Frank</dfn></div>
<div class="formHide" id="collection69_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection69','collection69')">Sr Sem: Consciousness: The Search for Self and Community Revisited<dfn>Adam Frank</dfn></div>
<div id="collection69" style="display:none;" class="w550 shadowed pb9">
<div class="formShow" id="section690_on" style="display:block;" onclick="toggleHeaderDiv(this,'section690','section690')">Theories of Consciousness</div>
<div class="formHide" id="section690_off" style="display:none;" onclick="toggleHeaderDiv(this,'section690','section690')">Theories of Consciousness</div>
<div id="section690" style="display:none;" class="w400 shadowed p3">
<div id="ref_43100886" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100886','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Facing Up to the Problem of Consciousness<dfn class="author">David Chalmers</dfn>
<input type="hidden" name="eref" value="43100886" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43100887" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43100887','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Review of Journal of Consciousness Studies<dfn class="author">David Chalmers</dfn>
<input type="hidden" name="eref" value="43100887" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43100909" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100909','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Hallucinogens and Rock Art<dfn class="author">Hopman</dfn>
<input type="hidden" name="eref" value="43100909" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section691_on" style="display:block;" onclick="toggleHeaderDiv(this,'section691','section691')">Consciousness and Community</div>
<div class="formHide" id="section691_off" style="display:none;" onclick="toggleHeaderDiv(this,'section691','section691')">Consciousness and Community</div>
<div id="section691" style="display:none;" class="w400 shadowed p3">
<div id="ref_43100908" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43100908','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Journey to Ixtlan<dfn class="author">Castaneda</dfn>
<input type="hidden" name="eref" value="43100908" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43100917" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100917','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Paleolithic Technology and Human Evolution<dfn class="author">Ambrose</dfn>
<input type="hidden" name="eref" value="43100917" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23200499" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23200499','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Global Chinatown<dfn class="author">Adam Frank</dfn>
<input type="hidden" name="eref" value="23200499" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43100925" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100925','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Moroccan Gnawa and Transglobal Trance<dfn class="author">Deborah Kapchan</dfn>
<input type="hidden" name="eref" value="43100925" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section692_on" style="display:block;" onclick="toggleHeaderDiv(this,'section692','section692')">Consciousness and the Brain</div>
<div class="formHide" id="section692_off" style="display:none;" onclick="toggleHeaderDiv(this,'section692','section692')">Consciousness and the Brain</div>
<div id="section692" style="display:none;" class="w400 shadowed p3">
</div>
<div class="formShow" id="section693_on" style="display:block;" onclick="toggleHeaderDiv(this,'section693','section693')">Consciousness and Disability</div>
<div class="formHide" id="section693_off" style="display:none;" onclick="toggleHeaderDiv(this,'section693','section693')">Consciousness and Disability</div>
<div id="section693" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100774" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100774','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Sensory Impairment<dfn class="author">Hadder and Keating</dfn>
<input type="hidden" name="eref" value="23100774" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section694_on" style="display:block;" onclick="toggleHeaderDiv(this,'section694','section694')">Social Consciousness</div>
<div class="formHide" id="section694_off" style="display:none;" onclick="toggleHeaderDiv(this,'section694','section694')">Social Consciousness</div>
<div id="section694" style="display:none;" class="w400 shadowed p3">
<div id="ref_43100708" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100708','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
How to Live Your Dream of Volunteering Overseas<dfn class="author">Joseph Collins</dfn>
<input type="hidden" name="eref" value="43100708" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
<div class="formShow" id="collection136_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection136','collection136')">Sr Sem: Inquiry, Work, and Self-Discovery<dfn>Donna Bowman</dfn></div>
<div class="formHide" id="collection136_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection136','collection136')">Sr Sem: Inquiry, Work, and Self-Discovery<dfn>Donna Bowman</dfn></div>
<div id="collection136" style="display:none;" class="w550 shadowed pb9">
<div id="ref_43101205" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43101205','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Service on the Campus: The Free University Movement and Educational Reform<dfn class="author">Paul Lauter and Florence Howe</dfn>
<input type="hidden" name="eref" value="43101205" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101345" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43101345','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
What Is School For?<dfn class="author">New York Times</dfn>
<input type="hidden" name="eref" value="43101345" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101341" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43101341','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Academy on the Firing Line<dfn class="author">John J. Laukaitis</dfn>
<input type="hidden" name="eref" value="43101341" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43101342" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43101342','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Bookends of the Twentieth Century: Irving Babbitt, E.D. Hirsch, and the Humanistic Curriculum<dfn class="author">Kipton D. Smilie</dfn>
<input type="hidden" name="eref" value="43101342" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`

// TODO Add type : NavigationTabs[]
export const getNavTabs = (html: string = HOME_RESPONSE) => {
    const $res = $('<div></div>').html(html);
    const $navTabs = $res.find("#navTabs");
    return $navTabs.children().map((i, $e) => {
        return {
            onClick: $e.getAttribute("onClick"),
            tabName: $e.innerText.trim()
        }
    });
}

export const getAnnouncementsTab = (html: string = HOME_RESPONSE) => {
    const $res = $('<div></div>').html(html);
    const $tabContent = $res.find("#tabContent .emWrap");
    const announcementsTab = {
        head: $tabContent.find(".emHead:eq(0)").text().trim(),
        date: $tabContent.find(".emHead:eq(1)").text().trim(),
        sections: getAnnouncementsSections($tabContent)
    }
    console.log(announcementsTab);
}

const getAnnouncementsSections = ($emWrap: JQuery): AnnouncementsSection[] => {
    let $clone = $emWrap.clone();
    $clone.find(".emHead").remove();
    let sections = splitElementsByHeadClassName($clone, ".emSection");
    let toReturn: AnnouncementsSection[] = [];
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        toReturn.push({
            name: section.find(".emSection").remove().text().trim(),
            list: getAnnouncementsItems(section)
        });
    }
    return toReturn;
}

const getAnnouncementsItems = ($emSection: JQuery): AnnouncementsItem[] => {
    let items = splitElementsByHeadClassName($emSection, ".emItem"); // PICKUP should only be splitting in two, but is splitting in three
    let toReturn = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        toReturn.push({
            date: item.find(".emDate").text().trim(),
            location: item.find(".emLocation").text().trim(),
            text: item.find(".emItem").text().trim()
        });
    }

    return toReturn;
}

export const getReadingsFromAllClasses = (html: string = SENIOR_SEMINAR_PAGE): Reading[] => {
    const $html = $('<div></div>').html(html);
    const $readContent = $html.find("#readContent > div");
    return getReadingsFromClass($readContent, "TEST TEST");
}

/**
 * TODO class schedule display/digestion
 * TODO syllabus links
 */

const getReadingsFromClass = ($content: JQuery, className: string): Reading[] => {
    let toReturn: Reading[] = [];
    let $readings = $content.find(".RecordListAlt1,.RecordListAlt2");
    $readings.each((i, reading) => {
        let $reading = $(reading);
        toReturn.push({
            professor: $reading.parent("[id^='collection']").prev().find("dfn:eq(0)").text().trim() ?? "Shared Reading",
            class: className,
            title: $reading.clone().children().remove().end().text().trim(),
            author: $reading.find("dfn").text().trim(),
            URL: getReadingOnClickURL($reading)
        })
    })
    return toReturn;
}

const getReadingOnClickURL = (reading: JQuery): string => {
    // TODO syllabus edge case https://honors.uca.edu/hcis/cabViewer.php?file=syllabi/syl_2779_20221008_115928.pdf&type=application/pdf&drawer=3256&
    let id = $(reading).attr("onclick")!.split("'")[1].substring(4);
    return `https://honors.uca.edu/hcis/stu/stuPage901.inc.php?cmd=print&eref=${id}&sendTab=901`;
}

/**
 * example: divide by ".emSection"
 * <div class=".emSection"> </div>
 * <div class=".emItem"> </div>
 * <div class=".emLocation"> </div>
 * <div class=".emSection"> </div>
 * <div class=".emItem"> </div>
 * 
 * results in 
 * [[.emSection, .emItem, .emLocation], [.emSection, .emItem]]
 */
const splitElementsByHeadClassName = ($parent: JQuery, header: string): JQuery[] => {
    let headerIndexes: number[] = [];
    let toReturn: Array<HTMLElement[]> = [];

    $parent.find(header).toArray().forEach((headerElem: HTMLElement) => {
        headerIndexes.push($parent.find(headerElem).index());
    });

    if ($parent.find(`${header}:eq(0)`).index() != 0) { // TODO refactor
        headerIndexes.unshift(0);
        headerIndexes = headerIndexes.map((value, i) => (i == 0) ? value : value + 1);
    }

    if (!$parent.last().hasClass(header)) {
        headerIndexes.push($parent.children().length);
    }

    for (let i = 0; i < headerIndexes.length - 1; i++) {
        let startIndex = headerIndexes[i];
        let endIndex = headerIndexes[i + 1];
        toReturn.push($parent.children().toArray().slice(startIndex, endIndex));
    }

    return toReturn.map((elems: HTMLElement[]) => {
        let $tempParent = $("<div></div>");
        elems.forEach((e: HTMLElement) => {
            $(e).appendTo($tempParent);
        })
        return $tempParent;
    });
}
