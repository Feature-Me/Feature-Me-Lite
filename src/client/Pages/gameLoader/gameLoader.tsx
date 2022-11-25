import compareVersions from "compare-versions";
import JSZip from "jszip";
import React from "react";
import { useNavigate } from "react-router";
import filesize from "filesize";
import { parseMusicCollection } from "Utils/Storage/installResources/musicResources/parseMusicCollection";

import style from "./gameLoader.scss";
import { motion, useAnimation } from "framer-motion";
import sleep from "Utils/sleep/sleep";

type versionMap = {
    [key: string]: { url: string, size: number, hash: string }
}


const GameLoader: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = React.useState("fetch");
    const [downloadCount, setDownloadCount] = React.useState(0);
    const [downloadedCount, setDownloadedCount] = React.useState(0);
    const [downloadSize, setDownloadSize] = React.useState(0);
    const [downloadedSize, setDownloadedSize] = React.useState(0);

    const animationController = useAnimation();
    const init = { opacity: 0 };
    const fadeIn = {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
    const fadeOut = {
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }

    React.useEffect(() => {
        animationController.start(fadeIn);
        fetchUpdate();
    }, [])

    function fetchUpdate() {
        const resourcesDownloaded = JSON.parse(localStorage.getItem("resourcesDownloaded")!);
        fetch("/update/map", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res: versionMap) => {
            setMode("download");
            Promise.all([fetchMusicUpdate(res)]).then(async values => {
                for (const name of values) {
                    if (name[1]) {
                        resourcesDownloaded[name[1]] = {
                            version: name[0]
                        }
                    }
                }
                localStorage.setItem("resourcesDownloaded", JSON.stringify(resourcesDownloaded));
                await sleep(1500);
                animationController.start(fadeOut);
                await sleep(500);
                navigate("./home");
            })
        }).catch(error => {
            console.error(error);
        })
    }


    function fetchMusicUpdate(versionMap: versionMap) {
        return new Promise<[string, string]>(async (resolve, reject) => {
            if (!versionMap) reject();
            const resourcesDownloaded = JSON.parse(localStorage.getItem("resourcesDownloaded")!);
            const fetchUrl = [];
            let latestVersion: string = resourcesDownloaded.music.version;
            for (const version in versionMap) {
                if (compareVersions(version, latestVersion) == 1) fetchUrl.push(versionMap[version]);
            }
            if (fetchUrl.length == 0) resolve([latestVersion, "music"]);
            for (let i = 0; i < fetchUrl.length; i++) {
                const version = fetchUrl[i];
                await fetch(version.url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    redirect: "follow",
                    mode: "cors"
                }).then(res => { if (res.ok) return res.arrayBuffer(); else throw new Error(res.statusText); }).then(res => {
                    setDownloadCount(c => c + 1);
                    setDownloadSize(s => s + res.byteLength);
                    JSZip.loadAsync(res).then(async zip => {
                        if (!zip.file("FileMap.json")) {
                            reject("Error fetching resources update: FileMap.json not found");
                        }
                        else {
                            try {
                                const fileMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));
                                await parseMusicCollection(zip);
                                setDownloadedCount(c => c + 1);
                                setDownloadedSize(s => s + res.byteLength)
                                if (i == fetchUrl.length - 1) {
                                    localStorage.setItem("resourcesDownloaded", JSON.stringify(resourcesDownloaded));
                                    resolve([compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion, "music"]);
                                }
                            } catch (error) {
                                console.log(error);
                                reject(error);
                            }
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        })

    }


    return (
        <div className={style.loadPage}>
            <motion.div className={style.modal} initial={init} animate={animationController}>
                <div className={style.inner}>
                    <h2>{mode}ing Update</h2>
                    <div className={style.content}>
                        Downloaded {downloadedCount} of {downloadCount} <br />
                        {filesize(downloadedSize)} of {filesize(downloadSize)}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default GameLoader;