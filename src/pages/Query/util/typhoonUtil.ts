/*
    该工具文件主要用于处理台风数据
 */

const EnumWindDirection = {
    N: "北",
    S: "南",
    W: "西",
    E: "东"
};


/**
 * 格式化风向数据
 * @param movedir "NSW"
 */
export const formWindDirection = (movedir: string) => {
    return (movedir.split("")).map((key: "N"|"S"|"W"|"E") => {
        return EnumWindDirection[key]
    }).join("");
};
