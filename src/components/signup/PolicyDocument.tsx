import { Linking, ScrollView, Text, View } from "react-native";

import { BackHeader, Divider, ScreenContainer } from "@/src/components/common";

import type { PolicyBlock, PolicyDocumentData } from "./policyDocuments";

type PolicyDocumentProps = {
  document: PolicyDocumentData;
};

export function PolicyDocument({ document }: PolicyDocumentProps) {
  return (
    <ScreenContainer>
      <BackHeader label={document.title} background="bg" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignSelf: "center",
          paddingTop: 20,
          paddingBottom: 40,
          width: 358,
        }}
      >
        <Text className="text-gray-900 text-b-05-m">{document.intro}</Text>
        <Divider className="my-3 border-gray-200" />

        <View className="gap-2">
          {document.sections.map((section) => (
            <View key={section.title} className="gap-1">
              <Text className="text-gray-900 text-cap-sb">{section.title}</Text>
              <View>
                {section.blocks.map((block, index) => (
                  <PolicyBlockView
                    key={`${section.title}-${index}`}
                    block={block}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "text":
      return <PolicyText>{block.text}</PolicyText>;
    case "ordered-list":
      return <OrderedList items={block.items} />;
    case "bullet-list":
      return <BulletList indent={block.indent} items={block.items} />;
    case "table":
      return <PolicyTable block={block} />;
  }
}

function PolicyText({ children }: { children: string }) {
  return <Text className="text-gray-900 text-cap-r">{children}</Text>;
}

function OrderedList({
  items,
}: {
  items: { text: string; children?: string[] }[];
}) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={`${index}-${item.text}`}>
          <View className="ml-[15px]">
            <Text className="absolute -left-3 w-2.5 text-right text-gray-900 text-cap-r">
              {index + 1}.
            </Text>
            <Text className="text-gray-900 text-cap-r">{item.text}</Text>
          </View>

          {item.children ? (
            <BulletList indent="deep" items={item.children} />
          ) : null}
        </View>
      ))}
    </View>
  );
}

function BulletList({
  indent = "normal",
  items,
}: {
  indent?: "normal" | "deep";
  items: string[];
}) {
  const marginClass = indent === "deep" ? "ml-[30px]" : "ml-[15px]";

  return (
    <View>
      {items.map((item) => (
        <View key={item} className={marginClass}>
          <Text className="absolute -left-2 text-gray-900 text-cap-r">•</Text>
          <BulletItemText item={item} />
        </View>
      ))}
    </View>
  );
}

function BulletItemText({ item }: { item: string }) {
  const emailPrefix = "이메일: ";

  if (item.startsWith(emailPrefix)) {
    const email = item.replace(emailPrefix, "");

    return (
      <Text className="flex-1 text-gray-900 text-cap-r">
        {emailPrefix}
        <Text
          className="text-gray-700 underline"
          onPress={() => Linking.openURL(`mailto:${email}`)}
        >
          {email}
        </Text>
      </Text>
    );
  }

  return <Text className="flex-1 text-gray-900 text-cap-r">{item}</Text>;
}

function PolicyTable({
  block,
}: {
  block: Extract<PolicyBlock, { type: "table" }>;
}) {
  return (
    <View className="my-0.5 flex-row items-start">
      {block.headers.map((header, index) => {
        const columnWidthClass = index === 0 ? "w-28" : "w-[246px]";

        return (
          <View key={header} className={index === 0 ? "-mr-px" : ""}>
            <View
              className={`${columnWidthClass} items-center justify-center bg-gray-200 px-2 py-0.5`}
            >
              <Text className="text-gray-800 text-cap-r">{header}</Text>
            </View>
            <View
              className={`${columnWidthClass} min-h-8 items-center justify-center border border-gray-200 px-2 py-0.5`}
            >
              <Text className="text-center text-gray-800 text-cap-r">
                {block.rows[0]?.[index]}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
