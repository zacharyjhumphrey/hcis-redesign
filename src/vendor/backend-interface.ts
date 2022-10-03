import * as $ from "jquery";

//  https://honors.uca.edu/hcis/stu/stuPage950.inc.php?cmd=tabWrite&pageTab=950
const HOME_RESPONSE = `
<div id="navBarWrap">
    <div id="navTabs">
        <div class="navTabSelected "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=040','formData');">
            Announcements</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage100.inc.php?cmd=tabWrite&amp;pageTab=100','formData');">
            Privacy<br />Information</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage110.inc.php?cmd=tabWrite&amp;pageTab=110','formData');">
            Personal Data<br />Verification </div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage304.inc.php?cmd=tabWrite&amp;pageTab=304','formData');">
            Grants</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage487.inc.php?cmd=tabWrite&amp;pageTab=487','formData');">
            Thesis</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage490.inc.php?cmd=tabWrite&amp;pageTab=490','formData');">
            Thesis<br />Upload</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage500.inc.php?cmd=tabWrite&amp;pageTab=500','formData');">
            Correspondence<br />and Records </div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage600.inc.php?cmd=tabWrite&amp;pageTab=600','formData');">
            Senior<br />Banquet</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage340.inc.php?cmd=tabWrite&amp;pageTab=340','formData');">
            Thesis<br />Search</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage901.inc.php?cmd=tabWrite&amp;pageTab=901','formData');">
            eReader</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage666.inc.php?cmd=tabWrite&amp;pageTab=666','formData');">
            Crazy<br />Quotes</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','stu/stuPage950.inc.php?cmd=tabWrite&amp;pageTab=950','formData');">
            Faculty<br />Hours</div>
        <div class="navTab "
            onclick="__checkClock();ajaxSend('tabContent','/hcis/stu/stuPage040.inc.php?cmd=tabWrite&amp;pageTab=99','formData');"
            style="float:right;">Log<br />Out</div>
        <div class="newline"></div>
        <input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken" />
    </div>
    <div class="sRecordHeader">
        <div class="fL">Humphrey, Zachary James <i>&#0034;Zach&#0034;</i> </div>
        <div style="clear:both;"></div>
    </div>
    <div class="newline"></div>
</div>
<div id="tabContent" style="padding:5px;">
    <div id="did_sec">
        <input type="hidden" name="referTab" value="040" id="iid_referTab" />
        <input type="hidden" name="sendTab" value="040" id="iid_sendTab" />
        <input type="hidden" name="secToken" value="75758d08cf24f0df47d1876b9f09818d" id="iid_secToken" />
    </div>
    <style>
        a:link {
            color: #00f;
            text-decoration: none;
        }

        a:visited {
            color: #00f;
            text-decoration: none;
        }

        a:active {
            color: #f00;
        }

        a:hover {
            color: #f00;
            text-decoration: underline;
        }

        .emWrap {
            width: auto;
            border: 1px black solid;
            background-color: #f8f8f8;
            margin: auto;
            padding: 20px;
        }

        //		.emWrap { width: 700px; border: 1px black solid; background-color: #f8f8f8; margin:auto; padding: 20px;	}
        .emHead {
            font-size: 18px;
            font-weight: bold;
            padding: 4px;
            font-family: serif;
            font-variant: small-caps;
        }

        .emSection {
            font-size: 15px;
            font-weight: bold;
            color: #818a8f;
            border-style: solid;
            border-width: 6px 0;
            border-color: #006b54;
            padding: 2px;
            margin: 10px;
        }

        .emDate {
            font-size: 14px;
            color: #26354a;
            font-weight: bold;
            font-variant: small-caps;
            text-decoration: underline;
            padding: 3px 0 3px 10px;
        }

        .emLocation {
            font-size: 14px;
            color: #26354a;
            font-variant: small-caps;
            padding: 0px 0 3px 10px;
        }

        .emItem {
            font-size: 12px;
            padding: 0px 25px 15px 25px;
        }

        .emNL {
            line-height: 50%;
        }
    </style>
    <div class="emWrap">
        <div class="emHead">Schedler Honors College Calendar</div>
        <div class="emHead">Sunday, October 2, 2022</div>
        <div class="emSection">Events</div>
        <div class="emDate">Tuesday, October 4, 2022 - 1:40 PM</div>
        <div class="emLocation">McCastlain Fireplace Room</div>
        <div class="emItem"><b>Dee Brown Photo Exhibit Opening Reception</b> - Please join us for the opening reception
            of the Dee Brown photo exhibit. Refreshments will be served. &#8220;Dorris Alexander &#8220;Dee&#8221; Brown
            was an American novelist, historian, and librarian. His most famous work, Bury My Heart at Wounded Knee,
            details the history of the United States&#8217; westward colonization of the continent between 1830 and 1890
            from the point of view of Native Americans.&#8221; Dee&#8217;s daughter, Linda, will be in attendance. If
            you are a history major, anthropology major, or have an interest in the history of our nation and the
            indigenous population, then this will be a worthwhile experience. I know it will also mean a lot to Linda to
            share this exhibit with you all. FYI, the Honors Organic Garden used in the Core III classes with Allison is
            named in memory of Dee Brown.</div>
        <div class="emDate">Wednesday, October 5, 2022 - 7:00 PM</div>
        <div class="emLocation">Farris Presentation Room</div>
        <div class="emItem"><b>Mentor Event: Honors Jeopardy!</b> - Have a hankerin&#8217; to show off your command of
            all things honors-y? Here&#8217;s your chance! Just remember: You win by asking the right questions!</div>
        <div class="emDate">Thursday, October 6, 2022 - 1:40 PM</div>
        <div class="emLocation">Farris Presentation Room</div>
        <div class="emItem"><b>Grant Writing Workshop</b> - If you are planning to apply for funding for research,
            internship, or study abroad, don&#8217;t miss this workshop that will help improve the quality of your
            application, and therefore the score that determines what percentage of your proposal is funded.</div>
        <div class="emDate">Friday, October 7, 2022 - 12:00 AM</div>
        <div class="emLocation">Brewer-Hegeman Conference Center</div>
        <div class="emItem"><b>UCA Hosts Southwest Conference on Asian Studies: Reconnecting in a Post-Pandemic
                World</b> - Interested in Asian humanities, politics, and pop culture? For the first time, the
            University of Central Arkansas is hosting the Southwest Conference on Asian Studies, one of the regional
            conferences of the Association for Asian Studies. For details on registration, see this link:<br /><br /
                class="emNL"><a href=https://www.swcas.net/ target=_blank>https://www.swcas.net/</a><br /><br /
                class="emNL">For more a copy of the preliminary program and info on undergraduate scholarships to
            attend, please contact Adam Frank.</div>
        <div class="emDate">Friday, October 7, 2022 - 9:00 PM</div>
        <div class="emLocation">Farris Courtyard</div>
        <div class="emItem"><b>Mentor Event: Spooky Stories</b> - Gotta good ghost story? Witnessed any hauntings? Been
            the victim of something paranormal? Come, tell us about it! And share &#8220;the chill!&#8221;</div>
        <div class="emDate">Friday, October 7, 2022 - 3:00 PM</div>
        <div class="emLocation">Farris Presentation Room</div>
        <div class="emItem"><b>Soapbox</b> - Avery Goodrich; A comprehensive guide and discussion of Conway&#8217;s
            numerous roundabouts and the United States interstate roads. Carson Clay; Assassins, a Sondheim musical
            telling the stories of presidential assassins, grows more relevant as time passes. From its commentary on
            the American dream to capitalism, its subject matter remains poignant today. Carson Clay will give a lecture
            walking through the musical and dissecting its themes.</div>
        <div class="emDate">Friday, October 14, 2022 - 6:00 PM</div>
        <div class="emLocation">HPER, large studio, 2nd floor &amp; Farris Presentation Room</div>
        <div class="emItem"><b>Ellen&#8217;s PPP+</b> - Join Ellen for her PPP+! You know what the PPP stands for, but
            what&#8217;s the +? The + is dancing, live music, laughter, and smiles.<br /><br /
                class="emNL">Ellen&#8217;s PPP is the second Dancing Bears Contra Dance of the fall with live music by
            the Faulkner County Good Time Band.<br /><br / class="emNL">Callers: Ellen will call one dance and a SPECIAL
            GUEST caller, Susan Todt, from Marshall, AR, will call the rest.<br /><br / class="emNL">Dancers: All of
            us!<br /><br / class="emNL">HPER: 6:00 pm Beginners Lesson. 6:30-7:30 pm - Dance.<br /><br /
                class="emNL">Farris Presentation: 7:30-8:00 pm - Pizza and Punch! Reflect and Discuss! Why did Ellen
            make her PPP a contra dance? What did you experience? Also an opportunity to talk to Rob Matson,
            Ellen&#8217;s husband, member of the band, and long-time contra dancer/performer.<br /><br /
                class="emNL">Come alone or bring some friends. It&#8217;s all good. Gender neutral and totally
            inclusive.<br /><br / class="emNL">If you want to bring a non-UCA guest to this PPP+, you are welcome to do
            so. Be sure to follow the HPER&#8217;s guest policy. If you&#8217;re unsure if you want to dance, have a
            seat and enjoy the band. (These folks are GOOD!) Who knows? You may get the urge to join the fun!<br /><br /
                class="emNL">What is contra dance? Pretty much what you&#8217;d get if a square dance married a swing
            dance. It&#8217;s hoots and hollers, laughter and smiles. Community folk dance. Everyone can do it. No prior
            experience necessary. Learn more here: <br /><br / class="emNL"><a href=https://vimeo.com/316215468
                target=_blank>https://vimeo.com/316215468</a><br /><br / class="emNL">Upcoming Dances: Nov. 11, Dec.
            ??<br /><br / class="emNL">Supported in part by the Gadd/Merrill Fund of the Country Dance and Song Society
            and the UCA Honors College.<br /><br / class="emNL">The Faulkner County Good Time Band is Rob
            (Mandolin/Piano), Tristan (Guitar), Crystal (Violin), Albert (Violin), and Rob (String Bass).</div>
        <div class="emDate">Friday, October 14, 2022 - 9:00 PM</div>
        <div class="emLocation">Outside the College of Business</div>
        <div class="emItem"><b>Mentor Event: Movie Night</b> - A crisp fall evening! A gathering of friends! A good
            scary movie! What&#8217;s not to like?!<br /><br / class="emNL">(Movie to be announced)</div>
        <div class="emDate">Tuesday, October 18, 2022 - 3:00 PM</div>
        <div class="emLocation">McAlister 302</div>
        <div class="emItem"><b>Tea Time with Tricia</b> - Join Dean Tricia Smith for tea, refreshments, and conversation
        </div>
        <div class="emSection">Announcements</div>
        <div class="emItem"><b>NASA DEVELOP Spring Research Fellowship</b> - NASA DEVELOP is looking for students for
            10-week paid research opportunities. Their projects focus on helping local, national, and international
            communities address their environmental concerns while utilizing NASA&#8217;s Earth observing fleet of
            satellites. NASA DEVELOP operates at eleven locations across the country at NASA Centers and other regional
            locations. This is a great opportunity for participants who are interested in practical applications of
            remote sensing and GIS, specifically in the field of Earth Science. Participants will work with NASA
            scientists, partner organizations, and science advisors to learn about the use of NASA Earth science data
            for use in water resources, disaster management, ecological forecasting, and other applications to address
            environmental community concerns. Details about this opportunity and how to apply can be found online at
            <br /><br / class="emNL"><a href=https://appliedsciences.nasa.gov/what-we-do/capacity-building/develop
                target=_blank>https://appliedsciences.nasa.gov/what-we-do/capacity-building/develop</a>
        </div>
        <div class="emItem"><b>PA applications for Core II (spring 2023) are OPEN!</b> - ****DEADLINE: Wednesday 10/12
            11:59pm****<br /><br / class="emNL">Come teach with us in Core II! Juniors and seniors (enrolled in 3000 or
            4000 level classes) are eligible to apply. Those selected will receive credit for HONC 4310, Capstone
            Seminar. You need to have noon MWF available in your spring schedule. Applicants will be notified of the
            results before Fall Break.</div>
        <div class="emItem"><b>Challenge Week 2022</b> - Mark your calendars! Challenge Week 2022 will run Monday,
            October 24th to Friday, October 28th. The theme this year? The Mental Health Crisis: Finding Our Way. For
            details on speakers, times, and locations, see the Challenge Week website: <br /><br / class="emNL"><a
                href=https://uca.edu/honors/cw2022/. target=_blank>https://uca.edu/honors/cw2022/. </a><br /><br /
                class="emNL">Everyone is required to attend two events and please tell friends and faculty outside of
            Honors. All are welcome.</div>
        <div class="emItem"><b>Honors Advanced Priority Registration</b> - Honors priority registration will open on
            October 26 at 7 am and will close on October 27. After October 27th, students in these categories will
            register on date of their classification. Be sure that you have met with your advisor before this time in
            order to have your advising hold lifted, and use the myUCA tool to check for any other holds leading up to
            the morning of October 26.</div>
        <div class="emItem"><b>AudiBear Volunteers</b> - Audibear is a project dedicated to having audio recordings of
            all our Core 1 and 2 texts for greater accessibility. Right now our focus is finishing Core 1 - we have 13
            texts available, so if you&#8217;re interested please sign up next to a specific reading in the attached
            google sheet (1 reading per person). Contact Madilyn at mhufford@cub.uca.edu with questions. Sign up here:
            <br /><br / class="emNL"><a
                href=https://docs.google.com/spreadsheets/d/1s7N-_FU-xSJ1VTpZgT1DSu8TJv-No1HGyea_uy1B6lg/edit?usp=sharing_eil_m&ts=6320f28b
                target=_blank>https://docs.google.com/spreadsheets/d/1s7N-_FU-xSJ1VTpZgT1DSu8TJv-No1HGyea_uy1B6lg/edit?usp=sharing_eil_m&ts=6320f28b</a>
        </div>
        <div class="emItem"><b>Study Abroad Interest Meetings</b> - Join faculty leaders and the study abroad office to
            learn about various faculty-led trips being offered by UCA this summer:<br /><br / class="emNL">UCA in
            Belize: October 4, 1:40, IHSB 201<br /><br / class="emNL">Cinematic Art in Mexico: September 29, 1:40,
            Stanley Russ 103<br /><br / class="emNL">UCA in Costa Rica: September 29, 1:40, Irby<br /><br /
                class="emNL">UCA in Vienna: October 13, 1:40, COB 206<br /><br / class="emNL">UCA OT Abroad: September
            29, 1:30, Doyne 326<br /><br / class="emNL">Italian Renaissance and the Modern Mind: TBA<br /><br /
                class="emNL">Interior Design, Nutrition &amp; Family Sciences: Florence: October 14, 10:00, MAC
            102<br /><br / class="emNL">Science, Society, and Service Learning in Rwanda: TBA<br /><br /
                class="emNL">Prague Quadrennial Experiential: September 29, 1:40, Snow Fine Arts 217<br /><br /
                class="emNL">Spanish Immersion in Costa Rica: October 11, 1:40, Irby 208</div>
        <div class="emItem"><b>Focus on a Fellowship</b> - The Woodrow Wilson Foundation supports several fellowships
            for graduates interested in teaching middle or high school in the STEM fields as well as in business. Google
            it, and see which of its programs seems right for you!</div>
    </div>
    <div class="newline" style="padding-bottom:12px;"></div>
</div>
`
interface NavigationTabs {
    onClick: string;
    tabName: string;
}

interface AnnouncementsTab {
    head: string;
    date: string;
    sections: AnnouncementsSection[];
}

interface AnnouncementsSection {
    name: string;
    list: AnnouncementsItem[];
}

interface AnnouncementsItem {
    date: string | null;
    location: string | null;
    item: string;
}

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

export const getTabContent = (html: string = HOME_RESPONSE) => {
    const $res = $('<div></div>').html(html);
    const $tabContent = $res.find("#tabContent .emWrap");
    const announcementsTab = {
        head: $tabContent.find(".emHead:eq(0)").text().trim(),
        date: $tabContent.find(".emHead:eq(1)").text().trim()
    }
    console.log(announcementsTab);
    // split based on emSection
    // then split based on emItem
    // console.log(announcementsContent);
}