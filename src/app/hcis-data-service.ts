import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAnnouncementsTab, getNavTabs, parseReadingsFromPage, getThesesFromResponse, wasLoginSuccess } from 'src/vendor/old-hcis-parser';
import { Reading, Thesis } from 'src/common';
import * as md5 from 'md5';
import { concatAll, forkJoin, map, mergeAll, Observable } from 'rxjs';

const DEVELOPMENT_SERVER_URL = 'https://f9c95a77-fcb2-4d91-9c04-6012b8d677ea.mock.pstmn.io';
const PRODUCTION_SERVER_URL = 'https://honors.uca.edu'
// TODO Cache for a day in development, prevent postman limit from getting used up
const THESIS_SEARCH_PAGE = `<div id="pageBar">
<div id="idcRecs">19 matching records found</div>
<div class="newline"></div>
</div>
<div class="ListHeader" >
<div class="ListTitle w5 alL"></div>
<div class="ListTitle w600 alL">Title</div>
<div class="ListTitle w250 alL">File</div>
<div class="newline"></div>
</div>
<div id="lid_67" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">The Conway Community Hours Project<dfn><i>Christina Massingill</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_67"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="67" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_131" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Preparing for the Future: Bringing Public Art to Conway<dfn><i>Sarah Pitman</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_131"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="131" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_149" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Using Technological Innovation to Improve the City of Conway, Arkansas<dfn><i>Michael Flanagin</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_149"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="149" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_317" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Collaboration to Achieve Economic Development: A Case Study of Conway, Arkansas, City Government<dfn><i>Amy Whitehead</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_317"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="317" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_467" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Interconnecting and Coordinating Traffic Signals:
An Application for Conway, Arkansas<dfn><i>Amanda MacMillan</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_467"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="467" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_821" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Sleepless in Conway: A Comprehensive Overview of Obstructive Sleep Apnea<dfn><i>Josh Smith</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_821"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="821" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_1147" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Conway Poetry Festival<dfn><i>Gretchen Colvert</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_1147"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="1147" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_2327" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Fording the Rivers of Conway:
The Use of Living Roofs to Alleviate
Rainwater Flooding Problems in Conway, Arkansas.<dfn><i>Kayla Cooper</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_2327"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="2327" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_2332" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">A New Conway Experience:
Disc Golf in the Making<dfn><i>Chad Dickinson</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_2332"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="2332" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_3025" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">The Distressingly Indeterminate
yet Indispensable Nature of Democracy:
A Case Study of an Urban Agriculture Policy
in Conway, Arkansas<dfn><i>Jenny Knight</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img src="themes/img/spacer.png" />
</div>
<div id="dtl_3025"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="3025" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_4877" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Astride for MS:
Equine-Assisted Activities
for Multiple Sclerosis Patients in Conway<dfn><i>Megan Cowling</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid4877" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid4877'); var s=getElementById('iid_icid4877');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_4877','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_4877');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_4877');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid4877" value="0" id="iid_icid4877"/>
</div>
<div id="dtl_4877"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="4877" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_5709" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">The Right to Sight: Vision Care Accessibility
for Homeless Individuals in Conway, Arkansas<dfn><i>Lillian McEntire</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid5709" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid5709'); var s=getElementById('iid_icid5709');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_5709','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_5709');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_5709');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid5709" value="0" id="iid_icid5709"/>
</div>
<div id="dtl_5709"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="5709" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_5966" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Comparing efficiency of roundabouts to traffic lights in Conway, Arkansas &#8211; A probabilistic and simulation approach<dfn><i>Andrew Jensen</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid5966" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid5966'); var s=getElementById('iid_icid5966');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_5966','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_5966');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_5966');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid5966" value="0" id="iid_icid5966"/>
</div>
<div id="dtl_5966"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="5966" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_6050" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Why Local? A Taste of Conway&#8217;s Local Food Movement<dfn><i>Ellen Huckabay</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid6050" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid6050'); var s=getElementById('iid_icid6050');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_6050','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_6050');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_6050');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid6050" value="0" id="iid_icid6050"/>
</div>
<div id="dtl_6050"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="6050" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_6626" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Local Snaps: Embracing Spoken-Word Poetry in Conway<dfn><i>Madi Guthrie</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid6626" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid6626'); var s=getElementById('iid_icid6626');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_6626','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_6626');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_6626');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid6626" value="0" id="iid_icid6626"/>
</div>
<div id="dtl_6626"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="6626" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_6823" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Public Bike Share in America &#8211; Conway, Arkansas:
A Case Study<dfn><i>Spencer Burton</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid6823" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid6823'); var s=getElementById('iid_icid6823');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_6823','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_6823');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_6823');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid6823" value="0" id="iid_icid6823"/>
</div>
<div id="dtl_6823"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="6823" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_6839" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">The Toxic Stream:
Using Eco-Art to Reveal the Issue of Plastic Pollution
in Aquatic Ecosystems to the Community of Conway, AR<dfn><i>Kate Shute</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid6839" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid6839'); var s=getElementById('iid_icid6839');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_6839','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_6839');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_6839');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid6839" value="0" id="iid_icid6839"/>
</div>
<div id="dtl_6839"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="6839" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_8491" class="RecordListAlt4">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Coffee Stains: Leaving a Mark on Conway<dfn><i>Caitlyn Phan</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid8491" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid8491'); var s=getElementById('iid_icid8491');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_8491','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_8491');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_8491');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid8491" value="0" id="iid_icid8491"/>
</div>
<div id="dtl_8491"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="8491" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
</div>
<div id="lid_9355" class="RecordListAlt3">
<div class="dataEntry w5 alL" title="[]">&nbsp;</div>
<div class="dataEntry w600 alL " title="[Title]">Pouring into Conway: Starting a Nonprofit Coffee Shop to aid the Homeless<dfn><i>Caden Darby</i></dfn></div>
<div class="dataIcon  w250 alL pt3" >
<img id="icid9355" src="themes/img/closedFolder.gif" onclick="var v=getElementById('icid9355'); var s=getElementById('iid_icid9355');
			if(s.value==0)	{v.src='themes/img/openFolder.gif';s.value=1;ajaxSend('lid_9355','/hcis/stu/stuPage340.inc.php?cmd=detail','dtl_9355');}
				else	{v.src='themes/img/closedFolder.gif';s.value=0;clearDiv('dtl_9355');}" class="bIconLink link alL" title=""/>
<input type="hidden" name="icid9355" value="0" id="iid_icid9355"/>
</div>
<div id="dtl_9355"></div>
<div class="newline"></div>
<input type="hidden" name="StIndex" value="9355" id="iid_StIndex"/>
<input type="hidden" name="sendTab" value="340" id="iid_sendTab"/>
<input type="hidden" name="pageTab" value="340" id="iid_pageTab"/>
<div class="newline"></div>
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
const JUNIOR_SEMINAR_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTabSelected" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="formShow" id="collection133_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection133','collection133')">Jr Sem: From Barter to Bitcoin: The Madness of Money<dfn>Allison Wallace</dfn></div>
<div class="formHide" id="collection133_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection133','collection133')">Jr Sem: From Barter to Bitcoin: The Madness of Money<dfn>Allison Wallace</dfn></div>
<div id="collection133" style="display:none;" class="w550 shadowed pb9">
<div id="ref_13101077" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13101077','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Money Talks: Learning the Language of Finance<dfn class="author">John Lanchester</dfn>
<input type="hidden" name="eref" value="13101077" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101344" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101344','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Evicted (excerpt)<dfn class="author">Matthew Desmond</dfn>
<input type="hidden" name="eref" value="33101344" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101346" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101346','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
&#8220;Progressive Tax&#8221;<dfn class="author">Tax Foundation</dfn>
<input type="hidden" name="eref" value="33101346" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101347" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101347','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Markets<dfn class="author">Omid Malekan</dfn>
<input type="hidden" name="eref" value="33101347" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101348" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101348','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Caste: The Origins of Our Discontent (excerpt)<dfn class="author">Isabel Wilkerson</dfn>
<input type="hidden" name="eref" value="33101348" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101349" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101349','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Utopia for Realists (excerpt)<dfn class="author">Rutger Bregman</dfn>
<input type="hidden" name="eref" value="33101349" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101350" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101350','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Deficit Myth (excerpt)<dfn class="author">Stephanie Kelton</dfn>
<input type="hidden" name="eref" value="33101350" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection121_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection121','collection121')">Jr Sem: Nature&#8217;s Nation: Stewardship and Sustainability in Public Lands<dfn>Allison Wallace</dfn></div>
<div class="formHide" id="collection121_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection121','collection121')">Jr Sem: Nature&#8217;s Nation: Stewardship and Sustainability in Public Lands<dfn>Allison Wallace</dfn></div>
<div id="collection121" style="display:none;" class="w550 shadowed pb9">
<div id="ref_13101285" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13101285','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Buffalo River Handbook<dfn class="author">Kenneth L. Smith</dfn>
<input type="hidden" name="eref" value="13101285" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101075" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101075','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Polemic: Industrial Tourism and the National Parks<dfn class="author">Edward Abbey</dfn>
<input type="hidden" name="eref" value="33101075" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101287" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101287','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
When Everything Beyond the Walls is Wild (excerpt)<dfn class="author">Lilace Mellin Guignard</dfn>
<input type="hidden" name="eref" value="33101287" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101290" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101290','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Stolen Water, Forgotten Liberties<dfn class="author">Jenny Barnes Butler</dfn>
<input type="hidden" name="eref" value="33101290" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101298" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101298','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
This Land: How Cowboys, Capitalism, and Corruption are Ruining the American West<dfn class="author">Christopher Ketcham</dfn>
<input type="hidden" name="eref" value="33101298" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection9_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection9','collection9')">JR SEM: GENDER, WOMEN, AND LAW<dfn>Cindy Lea</dfn></div>
<div class="formHide" id="collection9_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection9','collection9')">JR SEM: GENDER, WOMEN, AND LAW<dfn>Cindy Lea</dfn></div>
<div id="collection9" style="display:none;" class="w550 shadowed pb9">
<div class="formShow" id="section93_on" style="display:block;" onclick="toggleHeaderDiv(this,'section93','section93')">Feminist Theory</div>
<div class="formHide" id="section93_off" style="display:none;" onclick="toggleHeaderDiv(this,'section93','section93')">Feminist Theory</div>
<div id="section93" style="display:none;" class="w400 shadowed p3">
<div id="ref_33100952" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100952','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Conservative Feminism<dfn class="author">Richard Posner</dfn>
<input type="hidden" name="eref" value="33100952" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section90_on" style="display:block;" onclick="toggleHeaderDiv(this,'section90','section90')">Objectification</div>
<div class="formHide" id="section90_off" style="display:none;" onclick="toggleHeaderDiv(this,'section90','section90')">Objectification</div>
<div id="section90" style="display:none;" class="w400 shadowed p3">
<div id="ref_11110621" class="RecordListAlt2" onclick="ajaxNewWindow('ref_11110621','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Objectification<dfn class="author">Martha C. Nussbaum</dfn>
<input type="hidden" name="eref" value="11110621" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section91_on" style="display:block;" onclick="toggleHeaderDiv(this,'section91','section91')">Women in World</div>
<div class="formHide" id="section91_off" style="display:none;" onclick="toggleHeaderDiv(this,'section91','section91')">Women in World</div>
<div id="section91" style="display:none;" class="w400 shadowed p3">
<div id="ref_33100622" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100622','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
She Looks Like A Child<dfn class="author">Kevin Bales</dfn>
<input type="hidden" name="eref" value="33100622" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_11110623" class="RecordListAlt2" onclick="ajaxNewWindow('ref_11110623','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Human Trafficking maps<dfn class="author">Barbara Ehrenreich</dfn>
<input type="hidden" name="eref" value="11110623" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100624" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100624','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
America&#8217;s Dirty Work<dfn class="author">Joy M. Zarembka</dfn>
<input type="hidden" name="eref" value="33100624" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section92_on" style="display:block;" onclick="toggleHeaderDiv(this,'section92','section92')">Harassment</div>
<div class="formHide" id="section92_off" style="display:none;" onclick="toggleHeaderDiv(this,'section92','section92')">Harassment</div>
<div id="section92" style="display:none;" class="w400 shadowed p3">
<div id="ref_33100616" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100616','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Sexual Harassment Law &#8212; The Jury is Wrong<dfn class="author">Megan E. Wooster</dfn>
<input type="hidden" name="eref" value="33100616" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100953" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100953','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
McMiller v. Metro<dfn class="author">8th Circuit Court of Appeals</dfn>
<input type="hidden" name="eref" value="33100953" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section94_on" style="display:block;" onclick="toggleHeaderDiv(this,'section94','section94')">Legal System and case law</div>
<div class="formHide" id="section94_off" style="display:none;" onclick="toggleHeaderDiv(this,'section94','section94')">Legal System and case law</div>
<div id="section94" style="display:none;" class="w400 shadowed p3">
<div id="ref_33101304" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33101304','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Federal Court System in the United States<dfn class="author">Administrative Office of the Courts</dfn>
<input type="hidden" name="eref" value="33101304" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33101303" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33101303','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
How to Read a case<dfn class="author">Orin S. Kerr</dfn>
<input type="hidden" name="eref" value="33101303" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const CORE_I_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTabSelected" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="sRecordHeader"><div class="fL">Core I - Fall 2022</div><div style="clear:both;"></div></div>
<div id="prefix_6" class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=pre20226&amp;sendTab=901','pdf');" >
<div>Core I Preface</div>
<div class="newline"></div>
</div>
<div id="sched_6" class="RecordListAlt2" onclick="ajaxSend('sched_6','/hcis/stu/stuPage901.inc.php?cmd=coreSched','readContent');closeOverlay();" >
<div>Class Meeting &amp; Reading Schedule</div>
<input type="hidden" name="yr" value="2022" id="iid_yr"/>
<input type="hidden" name="sem" value="6" id="iid_sem"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<div class="newline"></div>
</div>
<div class="formShow" id="rl0_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl0','rl0')">Introduction: Thinking About Thinking</div>
<div class="formHide" id="rl0_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl0','rl0')">Introduction: Thinking About Thinking</div>
<div id="rl0" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100121&amp;sendTab=901','pdf');">Metaphors We Live By<dfn class="author">George Lakoff and Mark Johnson</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100514&amp;sendTab=901','pdf');">Where Am I?<dfn class="author">Daniel C. Dennett</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100068&amp;sendTab=901','pdf');">The Loss of the Creature<dfn class="author">Walker Percy</dfn></div>
</div>
<div class="formShow" id="rl1_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl1','rl1')">The era of classics</div>
<div class="formHide" id="rl1_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl1','rl1')">The era of classics</div>
<div id="rl1" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100007&amp;sendTab=901','pdf');">Apology<dfn class="author">Plato</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100122&amp;sendTab=901','pdf');">Allegory of the Cave<dfn class="author">Plato</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100508&amp;sendTab=901','pdf');">Confessions (excerpts)<dfn class="author">St. Augustine</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100511&amp;sendTab=901','pdf');">Confucian Teachings<dfn class="author">Patricia Buckley Ebrey</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100512&amp;sendTab=901','pdf');">Daoist Teachings<dfn class="author">Patricia Buckley Ebrey</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100504&amp;sendTab=901','pdf');">Oration on the Dignity of Man<dfn class="author">Giovanni Pico della Mirandola</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101078&amp;sendTab=901','pdf');">The Book of the City of Ladies<dfn class="author">Christine de Pisan</dfn></div>
</div>
<div class="formShow" id="rl2_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl2','rl2')">The era of exploration</div>
<div class="formHide" id="rl2_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl2','rl2')">The era of exploration</div>
<div id="rl2" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101088&amp;sendTab=901','pdf');">What Darwin Saw<dfn class="author">Jonathan Weiner</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101233&amp;sendTab=901','pdf');">Silent Spring - Excerpt<dfn class="author">Rachel Carson</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101178&amp;sendTab=901','pdf');">Divinity School Address (abridged)<dfn class="author">Ralph Waldo Emerson</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100123&amp;sendTab=901','pdf');">An Inquiry into the Nature and Causes of the Wealth of Nations<dfn class="author">Adam Smith</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100054&amp;sendTab=901','pdf');">Idealism and Materialism<dfn class="author">Karl Marx</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100040&amp;sendTab=901','pdf');">The Evocative Power of Things: Consumer Goods and the Preservation of Hopes and Ideals<dfn class="author">Grant McCracken</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100038&amp;sendTab=901','pdf');">Either/Or<dfn class="author">S&#0248;ren Kierkegaard</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100064&amp;sendTab=901','pdf');">Leap Of Faith<dfn class="author">S&#0248;ren Kierkegaard</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100041&amp;sendTab=901','pdf');">Existentialism Is A Humanism<dfn class="author">Jean-Paul Sartre</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100120&amp;sendTab=901','pdf');">Invisible Man<dfn class="author">Ralph Ellison</dfn></div>
</div>
<div class="formShow" id="rl3_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl3','rl3')">The era of perspectives</div>
<div class="formHide" id="rl3_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl3','rl3')">The era of perspectives</div>
<div id="rl3" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100515&amp;sendTab=901','pdf');">A Room of One&#8217;s Own (Excerpt Ch 2-3)<dfn class="author">Virginia Woolf</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=71310194&amp;sendTab=901','pdf');">The Second Sex<dfn class="author">Simone de Beauvoir</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=23200255&amp;sendTab=901','pdf');">Intimate Experiences of Place<dfn class="author">Yi-Fu Tuan</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101214&amp;sendTab=901','pdf');">Homeplace (a site of resistance)<dfn class="author">bell hooks</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101297&amp;sendTab=901','pdf');">What to the Slave is the Fourth of July? (abridged)<dfn class="author">Frederick Douglass</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101276&amp;sendTab=901','pdf');">Human Rights in a Brazilian Prison<dfn class="author">Paul Heritag</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101277&amp;sendTab=901','pdf');">Interview with Augusto Boal<dfn class="author">Amy Goodman</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201043&amp;sendTab=901','pdf');">In 1864<dfn class="author">Luci Tapahonso</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201044&amp;sendTab=901','pdf');">That American Flag<dfn class="author">Luci Tapahonso</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101215&amp;sendTab=901','pdf');">So Mexicans are taking jobs from Americans<dfn class="author">Jimmy Santiago Baca</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101184&amp;sendTab=901','pdf');">Sexual Behavior in the Human Male<dfn class="author">Alfred C. Kinsey, Wardell R. Pomeroy, Clyde E. Martin</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101274&amp;sendTab=901','pdf');">Trans*: What&#8217;s in a Name?<dfn class="author">Jack Halberstam</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101343&amp;sendTab=901','pdf');">Person and Community in African Thought<dfn class="author">Ifeanyi A. Menkiti</dfn></div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const CORE_II_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTabSelected" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="sRecordHeader"><div class="fL">Core II - Spring 2023</div><div style="clear:both;"></div></div>
<div id="prefix_1" class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=pre20231&amp;sendTab=901','pdf');" >
<div>Core II Preface</div>
<div class="newline"></div>
</div>
<div id="sched_1" class="RecordListAlt2" onclick="ajaxSend('sched_1','/hcis/stu/stuPage901.inc.php?cmd=coreSched','readContent');closeOverlay();" >
<div>Class Meeting &amp; Reading Schedule</div>
<input type="hidden" name="yr" value="2023" id="iid_yr"/>
<input type="hidden" name="sem" value="1" id="iid_sem"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<div class="newline"></div>
</div>
<div class="formShow" id="rl0_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl0','rl0')">Introduction</div>
<div class="formHide" id="rl0_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl0','rl0')">Introduction</div>
<div id="rl0" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200057&amp;sendTab=901','pdf');">The Indispensable Opposition<dfn class="author">Walter Lippmann</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100105&amp;sendTab=901','pdf');">Understanding Argument<dfn class="author">Annette T. Rottenberg</dfn></div>
</div>
<div class="formShow" id="rl1_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl1','rl1')">Foundations of Community</div>
<div class="formHide" id="rl1_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl1','rl1')">Foundations of Community</div>
<div id="rl1" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200104&amp;sendTab=901','pdf');">A Theory of Justice<dfn class="author">John Rawls</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200266&amp;sendTab=901','pdf');">On Liberty<dfn class="author">John Stuart Mill</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201200&amp;sendTab=901','pdf');">What Can We Do for Working People? and The Eight-Hour Movement<dfn class="author">Eugene V. Debs (edited and annotated by Whit Barringer)</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201330&amp;sendTab=901','pdf');">Five Hundred Nations Within One<dfn class="author">Walter Echo-Hawk, Huston Smith</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200262&amp;sendTab=901','pdf');">Civil Disobedience<dfn class="author">Henry David Thoreau</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100088&amp;sendTab=901','pdf');">Pluralization of Social Life-Worlds<dfn class="author">Peter Berger, Brigitte Berger, &amp; Hansfried Kellner</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200562&amp;sendTab=901','pdf');">Declaration of Sentiments and Resolutions<dfn class="author"></dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201335&amp;sendTab=901','pdf');">Demarginalizing the Intersection of Race and Sex<dfn class="author">Kimberle Crenshaw</dfn></div>
</div>
<div class="formShow" id="rl3_on" style="display:block;" onclick="toggleHeaderDiv(this,'rl3','rl3')">Community in action</div>
<div class="formHide" id="rl3_off" style="display:none;" onclick="toggleHeaderDiv(this,'rl3','rl3')">Community in action</div>
<div id="rl3" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13101309&amp;sendTab=901','pdf');">A Woman Seeking Justice<dfn class="author">Martha Nussbaum</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200569&amp;sendTab=901','pdf');">Speech at Ford Auditorium<dfn class="author">Malcolm X</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200264&amp;sendTab=901','pdf');">Letter from Birmingham Jail<dfn class="author">Martin Luther King</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200269&amp;sendTab=901','pdf');">The Land Ethic<dfn class="author">Aldo Leopold</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13200431&amp;sendTab=901','pdf');">Health Is Membership<dfn class="author">Wendell Berry</dfn></div>
<div class="RecordListAlt2" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13201338&amp;sendTab=901','pdf');">American Road Narratives: Reimagining Mobility in Literature and Film<dfn class="author">Ann Brigham</dfn></div>
<div class="RecordListAlt1" onclick="launchPDFWindow('/hcis/stu/stuPage901.inc.php?cmd=print&amp;eref=13100083&amp;sendTab=901','pdf');">The Paradox of Indoctrination: A Solution<dfn class="author">James W. Garrison</dfn></div>
</div>
<div class="formShow" id="collection138_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection138','collection138')">Core II: Search For Community<dfn>Donna Bowman</dfn></div>
<div class="formHide" id="collection138_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection138','collection138')">Core II: Search For Community<dfn>Donna Bowman</dfn></div>
<div id="collection138" style="display:none;" class="w550 shadowed pb9">
<div class="formShow" id="section1380_on" style="display:block;" onclick="toggleHeaderDiv(this,'section1380','section1380')">Introduction</div>
<div class="formHide" id="section1380_off" style="display:none;" onclick="toggleHeaderDiv(this,'section1380','section1380')">Introduction</div>
<div id="section1380" style="display:none;" class="w400 shadowed p3">
<div id="ref_13201351" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13201351','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Academic Freedom vs. Rights of Muslim Students<dfn class="author">Scott Jaschik</dfn>
<input type="hidden" name="eref" value="13201351" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section1381_on" style="display:block;" onclick="toggleHeaderDiv(this,'section1381','section1381')">Foundations of community</div>
<div class="formHide" id="section1381_off" style="display:none;" onclick="toggleHeaderDiv(this,'section1381','section1381')">Foundations of community</div>
<div id="section1381" style="display:none;" class="w400 shadowed p3">
<div id="ref_13200104" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200104','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
A Theory of Justice<dfn class="author">John Rawls</dfn>
<input type="hidden" name="eref" value="13200104" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200266" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13200266','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
On Liberty<dfn class="author">John Stuart Mill</dfn>
<input type="hidden" name="eref" value="13200266" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13201200" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13201200','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
What Can We Do for Working People? and The Eight-Hour Movement<dfn class="author">Eugene V. Debs (edited and annotated by Whit Barringer)</dfn>
<input type="hidden" name="eref" value="13201200" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13201330" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13201330','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Five Hundred Nations Within One<dfn class="author">Walter Echo-Hawk, Huston Smith</dfn>
<input type="hidden" name="eref" value="13201330" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200262" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200262','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Civil Disobedience<dfn class="author">Henry David Thoreau</dfn>
<input type="hidden" name="eref" value="13200262" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13100088" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13100088','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Pluralization of Social Life-Worlds<dfn class="author">Peter Berger, Brigitte Berger, &amp; Hansfried Kellner</dfn>
<input type="hidden" name="eref" value="13100088" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200562" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200562','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Declaration of Sentiments and Resolutions<dfn class="author"></dfn>
<input type="hidden" name="eref" value="13200562" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200558" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13200558','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Letter to Elizabeth Cady Stanton, November 5, 1872<dfn class="author">Susan B. Anthony</dfn>
<input type="hidden" name="eref" value="13200558" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200559" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200559','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Remarks by Susan B. Anthony in US Circuit Court<dfn class="author"></dfn>
<input type="hidden" name="eref" value="13200559" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section1382_on" style="display:block;" onclick="toggleHeaderDiv(this,'section1382','section1382')">Community in action</div>
<div class="formHide" id="section1382_off" style="display:none;" onclick="toggleHeaderDiv(this,'section1382','section1382')">Community in action</div>
<div id="section1382" style="display:none;" class="w400 shadowed p3">
<div id="ref_13101309" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13101309','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
A Woman Seeking Justice<dfn class="author">Martha Nussbaum</dfn>
<input type="hidden" name="eref" value="13101309" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13100056" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13100056','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Images of Relationship<dfn class="author">Carol Gilligan</dfn>
<input type="hidden" name="eref" value="13100056" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200557" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13200557','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
A Jury of Her Peers<dfn class="author">Susan Glaspell</dfn>
<input type="hidden" name="eref" value="13200557" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200264" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200264','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Letter from Birmingham Jail<dfn class="author">Martin Luther King</dfn>
<input type="hidden" name="eref" value="13200264" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200569" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13200569','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Speech at Ford Auditorium<dfn class="author">Malcolm X</dfn>
<input type="hidden" name="eref" value="13200569" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200269" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200269','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Land Ethic<dfn class="author">Aldo Leopold</dfn>
<input type="hidden" name="eref" value="13200269" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200431" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13200431','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Health Is Membership<dfn class="author">Wendell Berry</dfn>
<input type="hidden" name="eref" value="13200431" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13201338" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13201338','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
American Road Narratives: Reimagining Mobility in Literature and Film<dfn class="author">Ann Brigham</dfn>
<input type="hidden" name="eref" value="13201338" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13100083" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13100083','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Paradox of Indoctrination: A Solution<dfn class="author">James W. Garrison</dfn>
<input type="hidden" name="eref" value="13100083" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
<div class="formShow" id="collection139_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection139','collection139')">Core II: Search For Community<dfn>Adam Frank</dfn></div>
<div class="formHide" id="collection139_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection139','collection139')">Core II: Search For Community<dfn>Adam Frank</dfn></div>
<div id="collection139" style="display:none;" class="w550 shadowed pb9">
<div id="ref_13200560" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200560','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Focus on Interests, Not Positions<dfn class="author">Roger Fisher and William Ury</dfn>
<input type="hidden" name="eref" value="13200560" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const CORE_III_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTabSelected" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="formShow" id="collection39_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection39','collection39')">Core III: Granola Gardeners and Philosophical Pharmers: Organic Gardening and How it Got That Way<dfn>Allison Wallace</dfn></div>
<div class="formHide" id="collection39_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection39','collection39')">Core III: Granola Gardeners and Philosophical Pharmers: Organic Gardening and How it Got That Way<dfn>Allison Wallace</dfn></div>
<div id="collection39" style="display:none;" class="w550 shadowed pb9">
<div id="ref_33100546" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100546','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Where I Lived, and What I Lived For<dfn class="author">Henry David Thoreau</dfn>
<input type="hidden" name="eref" value="33100546" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100331" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100331','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Uncle Ben: Goin&#8217; Organic Just Like We Used To<dfn class="author">Jim Hightower</dfn>
<input type="hidden" name="eref" value="33100331" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100292" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100292','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Lily&#039;s Chickens<dfn class="author">Barbara Kingsolver</dfn>
<input type="hidden" name="eref" value="33100292" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100379" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100379','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Big Organic<dfn class="author">Michael Pollan</dfn>
<input type="hidden" name="eref" value="33100379" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13200114" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13200114','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Whole Horse<dfn class="author">Wendell Berry</dfn>
<input type="hidden" name="eref" value="13200114" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100552" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100552','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
All Flesh Is Grass<dfn class="author">Michael Pollan</dfn>
<input type="hidden" name="eref" value="33100552" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100553" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100553','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Grass: Thirteen Was of Looking at a Pasture<dfn class="author">Michael Pollan</dfn>
<input type="hidden" name="eref" value="33100553" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100333" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100333','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Silent Spring (Excerpts)<dfn class="author">Rachel Carson</dfn>
<input type="hidden" name="eref" value="33100333" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100748" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100748','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
&#8220;Their Manners Are Decorous and Praiseworthy&#8221;<dfn class="author">Dee Brown</dfn>
<input type="hidden" name="eref" value="33100748" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100747" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100747','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
New World Foods and Old World Demography<dfn class="author">Alfred W. Crosby, Jr.</dfn>
<input type="hidden" name="eref" value="33100747" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100898" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100898','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Good Life - Introduction<dfn class="author">Helen &amp; Scott Nearing</dfn>
<input type="hidden" name="eref" value="23100898" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100899" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23100899','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Our Good Earth<dfn class="author">Helen &amp; Scott Nearing</dfn>
<input type="hidden" name="eref" value="23100899" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100900" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100900','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Eating for Health<dfn class="author">Helen &amp; Scott Nearing</dfn>
<input type="hidden" name="eref" value="23100900" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100709" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33100709','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Frankenfood?: A Case for Genetically Modified Crops<dfn class="author">James E. McWilliams</dfn>
<input type="hidden" name="eref" value="33100709" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100934" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100934','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Pleasures of Eating<dfn class="author">Wendell Berry</dfn>
<input type="hidden" name="eref" value="23100934" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33200706" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33200706','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Desire: Control; Plant: The Potato<dfn class="author">Michael Pollan</dfn>
<input type="hidden" name="eref" value="33200706" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33100291" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100291','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
An Animal&#039;s Place<dfn class="author">Michael Pollan</dfn>
<input type="hidden" name="eref" value="33100291" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33200884" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33200884','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
To Be Master of One&#8217;s Own Stuff<dfn class="author">Matthew B. Crawford</dfn>
<input type="hidden" name="eref" value="33200884" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23101089" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23101089','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Notes for Chaps. 3-4<dfn class="author">Matthew Crawford</dfn>
<input type="hidden" name="eref" value="23101089" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23101295" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23101295','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Third Plate: Field Notes on the Future of Food (excerpt)<dfn class="author">Dan Barber</dfn>
<input type="hidden" name="eref" value="23101295" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23101296" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23101296','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Nature&#8217;s Matrix, excerpt<dfn class="author">Ivette Perfecto, John Vandermeer, Angus Wright</dfn>
<input type="hidden" name="eref" value="23101296" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23101311" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23101311','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Farming While Black<dfn class="author">Leah Penniman</dfn>
<input type="hidden" name="eref" value="23101311" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection8_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection8','collection8')">Core III: Rainbow Rights<dfn>Cindy Lea</dfn></div>
<div class="formHide" id="collection8_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection8','collection8')">Core III: Rainbow Rights<dfn>Cindy Lea</dfn></div>
<div id="collection8" style="display:none;" class="w550 shadowed pb9">
<div id="lsyl_2769" class="RecordListAlt1" onclick="ajaxNewWindow('lsyl_2769','cabViewer.php?file=syllabi/syl_2769_20221007_164434.pdf&amp;type=application/pdf&amp;drawer=345');">Course Syllabus</div>
<div class="formShow" id="section80_on" style="display:block;" onclick="toggleHeaderDiv(this,'section80','section80')">Intro</div>
<div class="formHide" id="section80_off" style="display:none;" onclick="toggleHeaderDiv(this,'section80','section80')">Intro</div>
<div id="section80" style="display:none;" class="w400 shadowed p3">
<div id="ref_13100327" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13100327','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Doubting Game and the Believing Game (Excerpts)<dfn class="author">Peter Elbow</dfn>
<input type="hidden" name="eref" value="13100327" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13100050" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13100050','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
How to Mark a Book<dfn class="author">Mortimer Adler</dfn>
<input type="hidden" name="eref" value="13100050" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13100105" class="RecordListAlt2" onclick="ajaxNewWindow('ref_13100105','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Understanding Argument<dfn class="author">Annette T. Rottenberg</dfn>
<input type="hidden" name="eref" value="13100105" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_90560002" class="RecordListAlt1" onclick="ajaxNewWindow('ref_90560002','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Challenge<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560002" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_90560001" class="RecordListAlt2" onclick="ajaxNewWindow('ref_90560001','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Lively Experiment<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560001" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_13201101" class="RecordListAlt1" onclick="ajaxNewWindow('ref_13201101','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Gender Treachery: Homophobia, Masculinity, and Threatened Identities<dfn class="author">Patrick Hopkins</dfn>
<input type="hidden" name="eref" value="13201101" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section81_on" style="display:block;" onclick="toggleHeaderDiv(this,'section81','section81')">Biology</div>
<div class="formHide" id="section81_off" style="display:none;" onclick="toggleHeaderDiv(this,'section81','section81')">Biology</div>
<div id="section81" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100544" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23100544','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Homosexuality and Biology<dfn class="author">Chandler Burr</dfn>
<input type="hidden" name="eref" value="23100544" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section82_on" style="display:block;" onclick="toggleHeaderDiv(this,'section82','section82')">Sodomy</div>
<div class="formHide" id="section82_off" style="display:none;" onclick="toggleHeaderDiv(this,'section82','section82')">Sodomy</div>
<div id="section82" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100548" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100548','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Disgust as Reason for Illegality<dfn class="author">Martha C. Nussbaum</dfn>
<input type="hidden" name="eref" value="23100548" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100550" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23100550','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Bowers v. Hardwick<dfn class="author">William B. Rubenstein</dfn>
<input type="hidden" name="eref" value="23100550" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section83_on" style="display:block;" onclick="toggleHeaderDiv(this,'section83','section83')">Marriage</div>
<div class="formHide" id="section83_off" style="display:none;" onclick="toggleHeaderDiv(this,'section83','section83')">Marriage</div>
<div id="section83" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100551" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100551','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Gay Marriage, Liberalism, and Recognition: The Case for Equal Treatment<dfn class="author">Jacob M. Held</dfn>
<input type="hidden" name="eref" value="23100551" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section84_on" style="display:block;" onclick="toggleHeaderDiv(this,'section84','section84')">Shame</div>
<div class="formHide" id="section84_off" style="display:none;" onclick="toggleHeaderDiv(this,'section84','section84')">Shame</div>
<div id="section84" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100549" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23100549','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Shame and &#8220;Moral Panic&#8221;: Gay Sex and &#8220;Animus&#8221;<dfn class="author">Martha C. Nussbaum</dfn>
<input type="hidden" name="eref" value="23100549" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_23100682" class="RecordListAlt1" onclick="ajaxNewWindow('ref_23100682','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Shameless, Whose Memories? Whose Victimhood?<dfn class="author">Arlene Stein</dfn>
<input type="hidden" name="eref" value="23100682" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section85_on" style="display:block;" onclick="toggleHeaderDiv(this,'section85','section85')">Religion</div>
<div class="formHide" id="section85_off" style="display:none;" onclick="toggleHeaderDiv(this,'section85','section85')">Religion</div>
<div id="section85" style="display:none;" class="w400 shadowed p3">
<div id="ref_23200554" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23200554','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
What the Bible Says about Homosexuality<dfn class="author">Soulforce, Mel White</dfn>
<input type="hidden" name="eref" value="23200554" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section87_on" style="display:block;" onclick="toggleHeaderDiv(this,'section87','section87')">Aids</div>
<div class="formHide" id="section87_off" style="display:none;" onclick="toggleHeaderDiv(this,'section87','section87')">Aids</div>
<div id="section87" style="display:none;" class="w400 shadowed p3">
<div id="ref_33100977" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33100977','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Ruth Coker Burks, the cemetery angel<dfn class="author">David Coon</dfn>
<input type="hidden" name="eref" value="33100977" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section86_on" style="display:block;" onclick="toggleHeaderDiv(this,'section86','section86')">Hate Crimes</div>
<div class="formHide" id="section86_off" style="display:none;" onclick="toggleHeaderDiv(this,'section86','section86')">Hate Crimes</div>
<div id="section86" style="display:none;" class="w400 shadowed p3">
<div id="ref_23100619" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23100619','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Hate Crimes Ch. 3 The Hate Debate<dfn class="author">Phyllis B. Gerstenfeld</dfn>
<input type="hidden" name="eref" value="23100619" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_11110620" class="RecordListAlt1" onclick="ajaxNewWindow('ref_11110620','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Hate Crimes Ch. 6 Hate Crime Victims<dfn class="author">Phyllis B. Gerstenfeld</dfn>
<input type="hidden" name="eref" value="11110620" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section88_on" style="display:block;" onclick="toggleHeaderDiv(this,'section88','section88')">Gender</div>
<div class="formHide" id="section88_off" style="display:none;" onclick="toggleHeaderDiv(this,'section88','section88')">Gender</div>
<div id="section88" style="display:none;" class="w400 shadowed p3">
</div>
<div class="formShow" id="section89_on" style="display:block;" onclick="toggleHeaderDiv(this,'section89','section89')">Transgender</div>
<div class="formHide" id="section89_off" style="display:none;" onclick="toggleHeaderDiv(this,'section89','section89')">Transgender</div>
<div id="section89" style="display:none;" class="w400 shadowed p3">
<div id="ref_23101275" class="RecordListAlt2" onclick="ajaxNewWindow('ref_23101275','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Trans*<dfn class="author">Jack Halberstram</dfn>
<input type="hidden" name="eref" value="23101275" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const CORE_IV_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTabSelected" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="formShow" id="collection89_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection89','collection89')">Core IV: Theatre and Social Justice<dfn>Adam Frank</dfn></div>
<div class="formHide" id="collection89_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection89','collection89')">Core IV: Theatre and Social Justice<dfn>Adam Frank</dfn></div>
<div id="collection89" style="display:none;" class="w550 shadowed pb9">
<div class="RecordListAlt3">Collection is not currently available.<br/>Check with your instructor.</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const TUTORIAL_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTabSelected" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
<div class="formShow" id="collection30_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection30','collection30')">Oxford Tutorial<dfn>Cindy Lea</dfn></div>
<div class="formHide" id="collection30_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection30','collection30')">Oxford Tutorial<dfn>Cindy Lea</dfn></div>
<div id="collection30" style="display:none;" class="w550 shadowed pb9">
<div id="lsyl_2773" class="RecordListAlt1" onclick="ajaxNewWindow('lsyl_2773','cabViewer.php?file=syllabi/syl_2773_20221007_164905.pdf&amp;type=application/pdf&amp;drawer=345');">Course Syllabus</div>
<div id="ref_90560001" class="RecordListAlt2" onclick="ajaxNewWindow('ref_90560001','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Lively Experiment<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560001" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43200212" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43200212','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
On Bullshit<dfn class="author">Harry G. Frankfurt</dfn>
<input type="hidden" name="eref" value="43200212" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201005" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201005','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
2015 Handbook<dfn class="author">Adam Frank</dfn>
<input type="hidden" name="eref" value="33201005" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201223" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201223','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Do we need institutional review boards for human subjects research conducted by big web companies?<dfn class="author">Jeff Leek</dfn>
<input type="hidden" name="eref" value="33201223" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201227" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201227','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Ethical Guidelines for Internet Research<dfn class="author">The Norwegian National Committee for Research Ethics in the Social Sciences and Humanities (NESH)</dfn>
<input type="hidden" name="eref" value="33201227" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201225" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201225','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Guidelines for Research Ethics in Science and Techology<dfn class="author">The Norwegian National Committee for Research Ethics in Science and Technology (NENT)</dfn>
<input type="hidden" name="eref" value="33201225" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201224" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201224','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Guidelines for Research Ethics in the Social Sciences, Humanities, Law and Theology<dfn class="author">The Norwegian National Committee for Research Ethics in the Social Sciences and Humanities (NESH)</dfn>
<input type="hidden" name="eref" value="33201224" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201226" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201226','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
WMA Declaration of Helsinki - Ethical Principles for Medical Research Involving Human Subjects<dfn class="author">World Medical Association General Assembly</dfn>
<input type="hidden" name="eref" value="33201226" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection53_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection53','collection53')">Oxford Tutorial<dfn>Adam Frank</dfn></div>
<div class="formHide" id="collection53_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection53','collection53')">Oxford Tutorial<dfn>Adam Frank</dfn></div>
<div id="collection53" style="display:none;" class="w550 shadowed pb9">
<div id="lsyl_2775" class="RecordListAlt2" onclick="ajaxNewWindow('lsyl_2775','cabViewer.php?file=syllabi/syl_2775_20220831_193954.pdf&amp;type=application/pdf&amp;drawer=3254');">Course Syllabus</div>
<div id="ref_43200212" class="RecordListAlt1" onclick="ajaxNewWindow('ref_43200212','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
On Bullshit<dfn class="author">Harry G. Frankfurt</dfn>
<input type="hidden" name="eref" value="43200212" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_43100627" class="RecordListAlt2" onclick="ajaxNewWindow('ref_43100627','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
American Scholar<dfn class="author">various</dfn>
<input type="hidden" name="eref" value="43100627" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_90560001" class="RecordListAlt1" onclick="ajaxNewWindow('ref_90560001','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Lively Experiment<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560001" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="collection134_on" style="display:block;" onclick="toggleHeaderDiv(this,'collection134','collection134')">Oxford Tutorial<dfn>Donna Bowman</dfn></div>
<div class="formHide" id="collection134_off" style="display:none;" onclick="toggleHeaderDiv(this,'collection134','collection134')">Oxford Tutorial<dfn>Donna Bowman</dfn></div>
<div id="collection134" style="display:none;" class="w550 shadowed pb9">
<div id="lsyl_2777" class="RecordListAlt2" onclick="ajaxNewWindow('lsyl_2777','cabViewer.php?file=syllabi/syl_2777_20221228_135828.pdf&amp;type=application/pdf&amp;drawer=3258');">Course Syllabus</div>
<div class="formShow" id="section1340_on" style="display:block;" onclick="toggleHeaderDiv(this,'section1340','section1340')">Finding your focus</div>
<div class="formHide" id="section1340_off" style="display:none;" onclick="toggleHeaderDiv(this,'section1340','section1340')">Finding your focus</div>
<div id="section1340" style="display:none;" class="w400 shadowed p3">
<div id="ref_33201222" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201222','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Facebook, OkCupid, and the Ethics of Online Social Experiments<dfn class="author">Lindsay Kolowich</dfn>
<input type="hidden" name="eref" value="33201222" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201223" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201223','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Do we need institutional review boards for human subjects research conducted by big web companies?<dfn class="author">Jeff Leek</dfn>
<input type="hidden" name="eref" value="33201223" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
<div class="formShow" id="section1341_on" style="display:block;" onclick="toggleHeaderDiv(this,'section1341','section1341')">Stepping into your project</div>
<div class="formHide" id="section1341_off" style="display:none;" onclick="toggleHeaderDiv(this,'section1341','section1341')">Stepping into your project</div>
<div id="section1341" style="display:none;" class="w400 shadowed p3">
<div id="ref_33201227" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201227','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Ethical Guidelines for Internet Research<dfn class="author">The Norwegian National Committee for Research Ethics in the Social Sciences and Humanities (NESH)</dfn>
<input type="hidden" name="eref" value="33201227" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201225" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201225','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Guidelines for Research Ethics in Science and Techology<dfn class="author">The Norwegian National Committee for Research Ethics in Science and Technology (NENT)</dfn>
<input type="hidden" name="eref" value="33201225" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201224" class="RecordListAlt1" onclick="ajaxNewWindow('ref_33201224','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
Guidelines for Research Ethics in the Social Sciences, Humanities, Law and Theology<dfn class="author">The Norwegian National Committee for Research Ethics in the Social Sciences and Humanities (NESH)</dfn>
<input type="hidden" name="eref" value="33201224" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_33201226" class="RecordListAlt2" onclick="ajaxNewWindow('ref_33201226','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
WMA Declaration of Helsinki - Ethical Principles for Medical Research Involving Human Subjects<dfn class="author">World Medical Association General Assembly</dfn>
<input type="hidden" name="eref" value="33201226" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
</div>
</div>
</div>
</div>
<div class="newline"></div>
</div>
`;
const OTHER_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTab" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTabSelected" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
</div>
</div>
<div id="ref_90560002" class="RecordListAlt1" onclick="ajaxNewWindow('ref_90560002','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Challenge<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560002" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div id="ref_90560001" class="RecordListAlt2" onclick="ajaxNewWindow('ref_90560001','/hcis/stu/stuPage901.inc.php?cmd=print&amp;sendTab=901');">
The Lively Experiment<dfn class="author">Norbert O. Schedler</dfn>
<input type="hidden" name="eref" value="90560001" id="iid_eref"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="pageTab" value="901" id="iid_pageTab"/>
</div>
<div class="newline"></div>
</div>
`;
const THESIS_PAGE = `<div id="navBarWrap">
<div id="navBar">
<div id="t_1310" class="navTab" onclick="ajaxSend('t_1310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core I</div>
<div id="t_1320" class="navTab" onclick="ajaxSend('t_1320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="1320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core II</div>
<div id="t_2310" class="navTab" onclick="ajaxSend('t_2310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core III</div>
<div id="t_2320" class="navTab" onclick="ajaxSend('t_2320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="2320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Core IV</div>
<div id="t_3310" class="navTab" onclick="ajaxSend('t_3310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Jr Seminar</div>
<div id="t_4310" class="navTab" onclick="ajaxSend('t_4310','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4310" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Sr Seminar</div>
<div id="t_3320" class="navTab" onclick="ajaxSend('t_3320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="3320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Tutorial</div>
<div id="t_4320" class="navTabSelected" onclick="ajaxSend('t_4320','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="4320" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Thesis</div>
<div id="t_5000" class="navTab" onclick="ajaxSend('t_5000','/hcis/stu/stuPage901.inc.php?cmd=contents','formData');">
<input type="hidden" name="tab" value="5000" id="iid_tab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
Other</div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<div class="navTab" style="float:right;" onclick="__checkClock();ajaxSend('navBarWrap','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">HCIS</div>
<div style="text-align:center;float:right;height:30px;"></div>
</div>
<div class="newline" style="padding-bottom:12px;"></div>
<input type="hidden" name="referTab" value="040" id="iid_referTab"/>
<input type="hidden" name="sendTab" value="901" id="iid_sendTab"/>
<input type="hidden" name="secToken" value="1bf5235d32033acf4c0b734bcd1e28e7" id="iid_secToken"/>
</div>
<div id="readContent">
<style type='text/css'>
.shad { border:2px solid #666;margin:6px auto;border-radius:6px;box-shadow:3px 3px 6px #888;}
</style>
<div class="w700 shadowed pb9" style="background-color:#e8e8e8;">
</div>
</div>
<div class="newline"></div>
</div>
`;

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

@Injectable({
  providedIn: 'root'
})
export class HCISDataService {
  BACKEND_URL = DEVELOPMENT_SERVER_URL;

  constructor(private http: HttpClient) {

  }

  postLogin = (username: string, password: string) => {
    let body = new URLSearchParams();
    body.set('logPg', '3');
    body.set('uname', username);
    body.set('pwaenc', md5(password));

    return this.http.post("/hcis/stu/stuPage101.inc.php", body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => wasLoginSuccess(htmlResponse))
    )
  }

  getCrazyQuotes = () => {
    return this.http.get("https://honors.uca.edu/hcis/stu/stuPage666.inc.php?cmd=tabWrite&pageTab=666");
  }

  getAllReadings = (): Observable<Reading[]> => {
    return forkJoin([
      this.getEReaderCoreIReadings(),
      this.getEReaderCoreIIReadings(),
      this.getEReaderCoreIIIReadings(),
      this.getEReaderCoreIVReadings(),
      this.getEReaderJuniorSeminarReadings(),
      this.getEReaderSeniorSeminarReadings(),
      this.getEReaderOtherReadings(),
      this.getEReaderTutorialReadings(),
      this.getEReaderThesisReadings()
    ]).pipe(mergeAll());
  }

  getThesisWithSearchTerm = (searchText: string, searchConnect: string): Thesis[] => {
    // let reposnse = this.http.post("https://honors.uca.edu/hcis/stu/stuPage340.inc.php?cmd=search", {
    //   searchText,
    //   searchConnect
    // });
    let response = THESIS_SEARCH_PAGE;

    return getThesesFromResponse(response);
  }

  // TODO Figure out if secToken is unique to me
  // TODO Make the prod build find assets on the same directory level
  // TODO Add login attempts to login component
  // TODO Find a way to make announcmenets more readable. text is too "together"
  // TODO Make login component look better on mobile
  // TODO Make login button aligned better
  // TODO Find all emails and links in announcements and wrap them in anchor tags
  // TODO Find a way to fix being on e-reader and the 404 being a repsonse
  // TODO Possibly make the proxy unique to dev build
  // TODO Add spinner to loading components for home and e-reader pages
  // TODO Faculty hours page?

  getAnnouncementsData = () => {
    let body = new URLSearchParams();
    body.set('secToken', "1bf5235d32033acf4c0b734bcd1e28e7");
    body.set('cmd', "page");
    body.set('sendTab', "040");
    body.set('pageTab', "040");
    body.set('defTab', "-1");
    return this.http.post(`/hcis/stu/stuPage040.inc.php`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => getAnnouncementsTab(htmlResponse))
    )
  }

  fetchEReaderTabContents = (classTabNumber: number, className: string) => {
    let body = new URLSearchParams();
    body.set('tab', classTabNumber.toString());
    body.set('sendTab', "901");
    body.set('secToken', "1bf5235d32033acf4c0b734bcd1e28e7");
    body.set('referTab', "666");
    return this.http.post(`/hcis/stu/stuPage901.inc.php?cmd=contents`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((htmlResponse: string) => parseReadingsFromPage(htmlResponse, className))
    )
  }

  getEReaderCoreIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(1310, "Core I");
  getEReaderCoreIIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(1320, "Core II");
  getEReaderCoreIIIReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(2310, "Core III");
  getEReaderCoreIVReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(2320, "Core IV");
  getEReaderJuniorSeminarReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(3310, "Junior Seminar");
  getEReaderSeniorSeminarReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(4310, "Senior Seminar");
  getEReaderTutorialReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(3320, "Tutorial");
  getEReaderThesisReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(4320, "Thesis");
  getEReaderOtherReadings = (): Observable<Reading[]> => this.fetchEReaderTabContents(5000, "Other");
}
