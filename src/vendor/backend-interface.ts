import * as $ from "jquery";
import { AnnouncementsItem, AnnouncementsSection, AnnouncementsTab, Reading, Thesis } from '../common';

// TODO Add type : NavigationTabs[]
export const getNavTabs = (html: string) => {
    const $res = $('<div></div>').html(html);
    const $navTabs = $res.find("#navTabs");
    return $navTabs.children().map((i, $e) => {
        return {
            onClick: $e.getAttribute("onClick"),
            tabName: $e.innerText.trim()
        }
    });
}

export const getAnnouncementsTab = (html: string): AnnouncementsTab => {
    const $res = $('<div></div>').html(html);
    const $tabContent = $res.find("#tabContent .emWrap");
    const announcementsTab = {
        head: $tabContent.find(".emHead:eq(0)").text().trim(),
        date: $tabContent.find(".emHead:eq(1)").text().trim(),
        sections: getAnnouncementsSections($tabContent)
    }

    return announcementsTab;
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

export const parseReadingsFromPage = (html: string, className: string): Reading[] => {
    const $html = $('<div></div>').html(html);
    const $readContent = $html.find("#readContent > div");
    return getReadingsFromClass($readContent, className);
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

/** TODO refactor for readability
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

    if ($parent.find(`${header}:eq(0)`).index() != 0) { 
        headerIndexes.unshift(0);
        headerIndexes = headerIndexes.map((value, i) => (i == 0) ? value : value + 1);
    }

    if (!$parent.last().hasClass(header) && headerIndexes[headerIndexes.length - 1] != $parent.children().length) {
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

export const getThesesFromResponse = (response: string): Thesis[] => {
    let $content = $('<div></div>').html(response);
    let toReturn: Thesis[] = [];
    let $allTheses = $content.find(".RecordListAlt3,.RecordListAlt4");
    $allTheses.each((i, thesis) => {
        let $thesis = $(thesis);
        toReturn.push({
            title: $thesis.find(".w600").clone().children().remove().end().text(),
            author: $thesis.find("i").text(),
            fileLink: ""
        })
    })
    return toReturn;
}
