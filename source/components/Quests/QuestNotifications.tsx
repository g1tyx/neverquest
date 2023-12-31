import { useEffect } from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN, QUEST_NOTIFICATION_DURATION } from "@neverquest/data/general";
import { QUEST_CLASS_ICONS } from "@neverquest/data/quests";
import { questNotifications } from "@neverquest/state/quests";

export function QuestNotifications() {
  const [questNotificationsValue, setQuestNotifications] = useRecoilState(questNotifications);
  const resetQuestNotifications = useResetRecoilState(questNotifications);

  useEffect(() => resetQuestNotifications, [resetQuestNotifications]);

  return (
    <ToastContainer className="mb-4" position="bottom-center">
      {questNotificationsValue.map(
        ({ description, hidden, ID: questNotificationOuterID, questClass, title }) => (
          <Toast
            autohide
            delay={QUEST_NOTIFICATION_DURATION}
            key={questNotificationOuterID}
            onClose={() => {
              setQuestNotifications((queue) =>
                queue.filter(
                  ({ ID: questNotificationInnerID }) =>
                    questNotificationOuterID !== questNotificationInnerID,
                ),
              );
            }}
            show
          >
            <ToastHeader>
              <IconDisplay
                className="me-auto"
                Icon={QUEST_CLASS_ICONS[questClass]}
                iconProps={{ className: "small" }}
              >
                <span>{title}</span>
              </IconDisplay>
            </ToastHeader>

            <ToastBody>
              <span>
                {hidden === undefined ? description : description.replace(LABEL_UNKNOWN, hidden)}
              </span>
            </ToastBody>
          </Toast>
        ),
      )}
    </ToastContainer>
  );
}
