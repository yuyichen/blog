import { useState, useEffect } from "react";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import Loading from "@/components/loading";
import dayjs from "dayjs";

export default () => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState({});

  const getListData = async () => {
    setLoading(true);
    const { data } = await axios.get("https://droidyue.com/atom.xml");
    const result = new XMLParser().parse(data);
    setListData(result?.feed || {});
    setLoading(false);
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div id="write">
      <Loading loading={loading}>
        <div className="text-sm text-gray-400 text-center">
          来源：《码农周刊》 更新于{dayjs(listData.updated).format("YYYY-MM-DD mm:ss")}
        </div>
        <ul>
          {(listData.entry || []).map((x, i) => {
            return (
              <ol key={x.id}>
                <a href={x.id} target="_blank">
                  <h3>{i+1}. {x.title}</h3>
                </a>
              </ol>
            );
          })}
        </ul>
      </Loading>
    </div>
  );
};
