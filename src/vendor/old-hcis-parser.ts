import * as $ from "jquery";
import { AnnouncementsItem, AnnouncementsSection, AnnouncementsTab, Reading, Thesis } from '../common';
import { LoginData } from "./interfaces";

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
        let name = item.find(".emItem").text().trim().split(' - ')[0];
        let text = item.find(".emItem").text().trim().slice((`${name} - `).length);
        toReturn.push({
            date: item.find(".emDate").text().trim(),
            location: item.find(".emLocation").text().trim(),
            text,
            name
        });
    }

    return toReturn;
}

// TODO: Fix this. The multiple appends are to cover the Other tab edge case
export const parseReadingsFromPage = (html: string, className: string): Reading[] => {
    const $html = $('<div></div>').html(html);
    const $readContent = $('<div></div>').html($html.find("#readContent > div").html()).append($html.find("> .RecordListAlt1")).append($html.find("> .RecordListAlt2"));
    return getReadingsFromClass($readContent, className);
}

enum LinkType {
    SYLLABUS,
    SCHEDULE,
    PREFACE,
    READING
}

/**
 * TODO class schedule display/digestion
 */
const getReadingsFromClass = ($content: JQuery, className: string): Reading[] => {
    let toReturn: Reading[] = [];
    let $readings = $content.find(".RecordListAlt1,.RecordListAlt2");
    $readings.each((i, reading) => {
        let $reading = $(reading);
        let linkType = getLinkType($reading);

        if (linkType == LinkType.SCHEDULE) {
            return;
        }

        toReturn.push({
            professor: $reading.parent("[id^='collection']").prev().find("dfn:eq(0)").text().trim() ?? "Shared Reading",
            class: className,
            title: getLinkTitle($reading, linkType),
            author: $reading.find("dfn").text().trim(),
            URL: getLinkURL($reading, linkType)
        })
    })
    return toReturn;
}

const getLinkTitle = ($reading: JQuery, type: LinkType): string => {
    if (type == LinkType.PREFACE) {
        return $reading.clone().children().text();
    }

    return $reading.clone().children().remove().end().text().trim();
}

const getLinkURL = ($reading: JQuery, type: LinkType) => {
    if (type == LinkType.SYLLABUS) {
        return getSyllabusOnClickURL($reading);
    }

    if (type == LinkType.PREFACE) {
        return getPrefaceOnClickURL($reading);
    }

    return getReadingOnClickURL($reading);
}

const getLinkType = ($reading: JQuery): LinkType => {
    if ($reading.attr("onclick")!.includes("eref=pre")) {
        return LinkType.PREFACE;
    }

    if ($reading.attr("onclick")!.includes("readContent")) {
        return LinkType.SCHEDULE;
    }

    if ($reading.attr("onclick")!.includes("syllabi")) {
        return LinkType.SYLLABUS;
    }

    return LinkType.READING;
}

const getReadingOnClickURL = ($reading: JQuery): string => {
    let id = $reading.attr("onclick")!.split("'")[1].substring(4);
    return `https://honors.uca.edu/hcis/stu/stuPage901.inc.php?cmd=print&eref=${id}&sendTab=901`;
}

const getSyllabusOnClickURL = ($reading: JQuery): string => {
    let url = $reading.attr("onclick")!.split("'")[3];
    return `https://honors.uca.edu/hcis/${url}`;
}

const getPrefaceOnClickURL = ($reading: JQuery): string => {
    let url = $reading.attr("onclick")!.split("'")[1];
    return `https://honors.uca.edu/${url}`;
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

export const wasLoginSuccess = (body: string): LoginData => {
    let $tempParent = $("<div></div>");
    $tempParent.append(body);
    return {
        success: $tempParent.find('.sysInfo').length > 0
    };
}
