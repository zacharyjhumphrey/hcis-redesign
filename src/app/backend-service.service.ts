import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getReadingsFromAllClasses, getThesesFromResponse } from 'src/vendor/backend-interface';
import { Thesis } from 'src/common';

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

// POST: https://honors.uca.edu/hcis/stu/stuPage901.inc.php?cmd=contents
// form data: tab: 1320, sendTab: 901, referTab: 040
// TODO Need to fix the thesis page links
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

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  constructor(private http: HttpClient) { }

  getCrazyQuotes = () => {
    return this.http.get("https://honors.uca.edu/hcis/stu/stuPage666.inc.php?cmd=tabWrite&pageTab=666");
  }

  getAllReadings = () => {
    // let repsonse = this.http.get("")
    let response = SENIOR_SEMINAR_PAGE;

    return getReadingsFromAllClasses(response);
  }

  getThesisWithSearchTerm = (searchText: string, searchConnect: string): Thesis[] => {
    // let reposnse = this.http.post("https://honors.uca.edu/hcis/stu/stuPage340.inc.php?cmd=search", {
    //   searchText,
    //   searchConnect
    // });
    let response = THESIS_SEARCH_PAGE;

    return getThesesFromResponse(response);
  }
}
