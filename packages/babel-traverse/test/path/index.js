import { NodePath } from "../../lib/index.js";
import { itBabel7NoESM } from "$repo-utils";

describe("NodePath", () => {
  describe("setData/getData", () => {
    it("can set default value", () => {
      const path = new NodePath({}, {});

      expect(path.getData("foo", "test")).toBe("test");
    });
    it("can set false", () => {
      const path = new NodePath({}, {});
      path.setData("foo", false);

      expect(path.getData("foo", true)).toBe(false);
    });

    it("can set true", () => {
      const path = new NodePath({}, {});
      path.setData("foo", true);

      expect(path.getData("foo", false)).toBe(true);
    });

    it("can set null", () => {
      const path = new NodePath({}, {});
      path.setData("foo", null);

      expect(path.getData("foo", true)).toBe(null);
    });

    it("can use false as default", () => {
      const path = new NodePath({}, {});

      expect(path.getData("foo", false)).toBe(false);
    });

    it("does not use object base properties", () => {
      const path = new NodePath({}, {});

      expect(path.getData("__proto__", "test")).toBe("test");
    });

    it("can use symbols as keys", () => {
      const path = new NodePath({}, {});
      const symbol = Symbol("foo");
      path.setData(symbol, 42);

      expect(path.getData(symbol)).toBe(42);
    });

    describe("hasNode", () => {
      it("returns false if node is null", () => {
        const path = new NodePath({}, {});

        expect(path.hasNode()).toBe(false);
      });

      it("returns true if node is not null", () => {
        const path = new NodePath({}, {});
        path.node = {};

        expect(path.hasNode()).toBe(true);
      });
    });

    itBabel7NoESM("methods babel 7", () => {
      const path = new NodePath({}, {});
      const keys = Object.keys(Object.getPrototypeOf(path)).sort();

      expect(keys).toMatchInlineSnapshot(`
        Array [
          "_assertUnremoved",
          "_call",
          "_callRemovalHooks",
          "_containerInsert",
          "_containerInsertAfter",
          "_containerInsertBefore",
          "_getKey",
          "_getPattern",
          "_getQueueContexts",
          "_getTypeAnnotation",
          "_guessExecutionStatusRelativeTo",
          "_guessExecutionStatusRelativeToDifferentFunctions",
          "_markRemoved",
          "_remove",
          "_removeFromScope",
          "_replaceWith",
          "_resolve",
          "_resyncKey",
          "_resyncList",
          "_resyncParent",
          "_resyncRemoved",
          "_verifyNodeList",
          "addComment",
          "addComments",
          "arrowFunctionToExpression",
          "arrowFunctionToShadowed",
          "assertAccessor",
          "assertAnyTypeAnnotation",
          "assertArgumentPlaceholder",
          "assertArrayExpression",
          "assertArrayPattern",
          "assertArrayTypeAnnotation",
          "assertArrowFunctionExpression",
          "assertAssignmentExpression",
          "assertAssignmentPattern",
          "assertAwaitExpression",
          "assertBigIntLiteral",
          "assertBinary",
          "assertBinaryExpression",
          "assertBindExpression",
          "assertBlock",
          "assertBlockParent",
          "assertBlockStatement",
          "assertBooleanLiteral",
          "assertBooleanLiteralTypeAnnotation",
          "assertBooleanTypeAnnotation",
          "assertBreakStatement",
          "assertCallExpression",
          "assertCatchClause",
          "assertClass",
          "assertClassAccessorProperty",
          "assertClassBody",
          "assertClassDeclaration",
          "assertClassExpression",
          "assertClassImplements",
          "assertClassMethod",
          "assertClassPrivateMethod",
          "assertClassPrivateProperty",
          "assertClassProperty",
          "assertCompletionStatement",
          "assertConditional",
          "assertConditionalExpression",
          "assertContinueStatement",
          "assertDebuggerStatement",
          "assertDecimalLiteral",
          "assertDeclaration",
          "assertDeclareClass",
          "assertDeclareExportAllDeclaration",
          "assertDeclareExportDeclaration",
          "assertDeclareFunction",
          "assertDeclareInterface",
          "assertDeclareModule",
          "assertDeclareModuleExports",
          "assertDeclareOpaqueType",
          "assertDeclareTypeAlias",
          "assertDeclareVariable",
          "assertDeclaredPredicate",
          "assertDecorator",
          "assertDirective",
          "assertDirectiveLiteral",
          "assertDoExpression",
          "assertDoWhileStatement",
          "assertEmptyStatement",
          "assertEmptyTypeAnnotation",
          "assertEnumBody",
          "assertEnumBooleanBody",
          "assertEnumBooleanMember",
          "assertEnumDeclaration",
          "assertEnumDefaultedMember",
          "assertEnumMember",
          "assertEnumNumberBody",
          "assertEnumNumberMember",
          "assertEnumStringBody",
          "assertEnumStringMember",
          "assertEnumSymbolBody",
          "assertExistsTypeAnnotation",
          "assertExportAllDeclaration",
          "assertExportDeclaration",
          "assertExportDefaultDeclaration",
          "assertExportDefaultSpecifier",
          "assertExportNamedDeclaration",
          "assertExportNamespaceSpecifier",
          "assertExportSpecifier",
          "assertExpression",
          "assertExpressionStatement",
          "assertExpressionWrapper",
          "assertFile",
          "assertFlow",
          "assertFlowBaseAnnotation",
          "assertFlowDeclaration",
          "assertFlowPredicate",
          "assertFlowType",
          "assertFor",
          "assertForInStatement",
          "assertForOfStatement",
          "assertForStatement",
          "assertForXStatement",
          "assertFunction",
          "assertFunctionDeclaration",
          "assertFunctionExpression",
          "assertFunctionParent",
          "assertFunctionTypeAnnotation",
          "assertFunctionTypeParam",
          "assertGenericTypeAnnotation",
          "assertIdentifier",
          "assertIfStatement",
          "assertImmutable",
          "assertImport",
          "assertImportAttribute",
          "assertImportDeclaration",
          "assertImportDefaultSpecifier",
          "assertImportExpression",
          "assertImportNamespaceSpecifier",
          "assertImportOrExportDeclaration",
          "assertImportSpecifier",
          "assertIndexedAccessType",
          "assertInferredPredicate",
          "assertInterfaceDeclaration",
          "assertInterfaceExtends",
          "assertInterfaceTypeAnnotation",
          "assertInterpreterDirective",
          "assertIntersectionTypeAnnotation",
          "assertJSX",
          "assertJSXAttribute",
          "assertJSXClosingElement",
          "assertJSXClosingFragment",
          "assertJSXElement",
          "assertJSXEmptyExpression",
          "assertJSXExpressionContainer",
          "assertJSXFragment",
          "assertJSXIdentifier",
          "assertJSXMemberExpression",
          "assertJSXNamespacedName",
          "assertJSXOpeningElement",
          "assertJSXOpeningFragment",
          "assertJSXSpreadAttribute",
          "assertJSXSpreadChild",
          "assertJSXText",
          "assertLVal",
          "assertLabeledStatement",
          "assertLiteral",
          "assertLogicalExpression",
          "assertLoop",
          "assertMemberExpression",
          "assertMetaProperty",
          "assertMethod",
          "assertMiscellaneous",
          "assertMixedTypeAnnotation",
          "assertModuleDeclaration",
          "assertModuleExpression",
          "assertModuleSpecifier",
          "assertNewExpression",
          "assertNoop",
          "assertNullLiteral",
          "assertNullLiteralTypeAnnotation",
          "assertNullableTypeAnnotation",
          "assertNumberLiteral",
          "assertNumberLiteralTypeAnnotation",
          "assertNumberTypeAnnotation",
          "assertNumericLiteral",
          "assertObjectExpression",
          "assertObjectMember",
          "assertObjectMethod",
          "assertObjectPattern",
          "assertObjectProperty",
          "assertObjectTypeAnnotation",
          "assertObjectTypeCallProperty",
          "assertObjectTypeIndexer",
          "assertObjectTypeInternalSlot",
          "assertObjectTypeProperty",
          "assertObjectTypeSpreadProperty",
          "assertOpaqueType",
          "assertOptionalCallExpression",
          "assertOptionalIndexedAccessType",
          "assertOptionalMemberExpression",
          "assertParenthesizedExpression",
          "assertPattern",
          "assertPatternLike",
          "assertPipelineBareFunction",
          "assertPipelinePrimaryTopicReference",
          "assertPipelineTopicExpression",
          "assertPlaceholder",
          "assertPrivate",
          "assertPrivateName",
          "assertProgram",
          "assertProperty",
          "assertPureish",
          "assertQualifiedTypeIdentifier",
          "assertRecordExpression",
          "assertRegExpLiteral",
          "assertRegexLiteral",
          "assertRestElement",
          "assertRestProperty",
          "assertReturnStatement",
          "assertScopable",
          "assertSequenceExpression",
          "assertSpreadElement",
          "assertSpreadProperty",
          "assertStandardized",
          "assertStatement",
          "assertStaticBlock",
          "assertStringLiteral",
          "assertStringLiteralTypeAnnotation",
          "assertStringTypeAnnotation",
          "assertSuper",
          "assertSwitchCase",
          "assertSwitchStatement",
          "assertSymbolTypeAnnotation",
          "assertTSAnyKeyword",
          "assertTSArrayType",
          "assertTSAsExpression",
          "assertTSBaseType",
          "assertTSBigIntKeyword",
          "assertTSBooleanKeyword",
          "assertTSCallSignatureDeclaration",
          "assertTSConditionalType",
          "assertTSConstructSignatureDeclaration",
          "assertTSConstructorType",
          "assertTSDeclareFunction",
          "assertTSDeclareMethod",
          "assertTSEntityName",
          "assertTSEnumDeclaration",
          "assertTSEnumMember",
          "assertTSExportAssignment",
          "assertTSExpressionWithTypeArguments",
          "assertTSExternalModuleReference",
          "assertTSFunctionType",
          "assertTSImportEqualsDeclaration",
          "assertTSImportType",
          "assertTSIndexSignature",
          "assertTSIndexedAccessType",
          "assertTSInferType",
          "assertTSInstantiationExpression",
          "assertTSInterfaceBody",
          "assertTSInterfaceDeclaration",
          "assertTSIntersectionType",
          "assertTSIntrinsicKeyword",
          "assertTSLiteralType",
          "assertTSMappedType",
          "assertTSMethodSignature",
          "assertTSModuleBlock",
          "assertTSModuleDeclaration",
          "assertTSNamedTupleMember",
          "assertTSNamespaceExportDeclaration",
          "assertTSNeverKeyword",
          "assertTSNonNullExpression",
          "assertTSNullKeyword",
          "assertTSNumberKeyword",
          "assertTSObjectKeyword",
          "assertTSOptionalType",
          "assertTSParameterProperty",
          "assertTSParenthesizedType",
          "assertTSPropertySignature",
          "assertTSQualifiedName",
          "assertTSRestType",
          "assertTSSatisfiesExpression",
          "assertTSStringKeyword",
          "assertTSSymbolKeyword",
          "assertTSThisType",
          "assertTSTupleType",
          "assertTSType",
          "assertTSTypeAliasDeclaration",
          "assertTSTypeAnnotation",
          "assertTSTypeAssertion",
          "assertTSTypeElement",
          "assertTSTypeLiteral",
          "assertTSTypeOperator",
          "assertTSTypeParameter",
          "assertTSTypeParameterDeclaration",
          "assertTSTypeParameterInstantiation",
          "assertTSTypePredicate",
          "assertTSTypeQuery",
          "assertTSTypeReference",
          "assertTSUndefinedKeyword",
          "assertTSUnionType",
          "assertTSUnknownKeyword",
          "assertTSVoidKeyword",
          "assertTaggedTemplateExpression",
          "assertTemplateElement",
          "assertTemplateLiteral",
          "assertTerminatorless",
          "assertThisExpression",
          "assertThisTypeAnnotation",
          "assertThrowStatement",
          "assertTopicReference",
          "assertTryStatement",
          "assertTupleExpression",
          "assertTupleTypeAnnotation",
          "assertTypeAlias",
          "assertTypeAnnotation",
          "assertTypeCastExpression",
          "assertTypeParameter",
          "assertTypeParameterDeclaration",
          "assertTypeParameterInstantiation",
          "assertTypeScript",
          "assertTypeofTypeAnnotation",
          "assertUnaryExpression",
          "assertUnaryLike",
          "assertUnionTypeAnnotation",
          "assertUpdateExpression",
          "assertUserWhitespacable",
          "assertV8IntrinsicIdentifier",
          "assertVariableDeclaration",
          "assertVariableDeclarator",
          "assertVariance",
          "assertVoidTypeAnnotation",
          "assertWhile",
          "assertWhileStatement",
          "assertWithStatement",
          "assertYieldExpression",
          "baseTypeStrictlyMatches",
          "call",
          "canHaveVariableDeclarationOrExpression",
          "canSwapBetweenExpressionAndStatement",
          "couldBeBaseType",
          "ensureBlock",
          "equals",
          "evaluate",
          "evaluateTruthy",
          "find",
          "findParent",
          "get",
          "getAllNextSiblings",
          "getAllPrevSiblings",
          "getAncestry",
          "getBindingIdentifierPaths",
          "getBindingIdentifiers",
          "getCompletionRecords",
          "getDeepestCommonAncestorFrom",
          "getEarliestCommonAncestorFrom",
          "getFunctionParent",
          "getNextSibling",
          "getOpposite",
          "getOuterBindingIdentifierPaths",
          "getOuterBindingIdentifiers",
          "getPrevSibling",
          "getSibling",
          "getSource",
          "getStatementParent",
          "getTypeAnnotation",
          "has",
          "hoist",
          "inType",
          "insertAfter",
          "insertBefore",
          "is",
          "isAccessor",
          "isAncestor",
          "isAnyTypeAnnotation",
          "isArgumentPlaceholder",
          "isArrayExpression",
          "isArrayPattern",
          "isArrayTypeAnnotation",
          "isArrowFunctionExpression",
          "isAssignmentExpression",
          "isAssignmentPattern",
          "isAwaitExpression",
          "isBaseType",
          "isBigIntLiteral",
          "isBinary",
          "isBinaryExpression",
          "isBindExpression",
          "isBindingIdentifier",
          "isBlacklisted",
          "isBlock",
          "isBlockParent",
          "isBlockScoped",
          "isBlockStatement",
          "isBooleanLiteral",
          "isBooleanLiteralTypeAnnotation",
          "isBooleanTypeAnnotation",
          "isBreakStatement",
          "isCallExpression",
          "isCatchClause",
          "isClass",
          "isClassAccessorProperty",
          "isClassBody",
          "isClassDeclaration",
          "isClassExpression",
          "isClassImplements",
          "isClassMethod",
          "isClassPrivateMethod",
          "isClassPrivateProperty",
          "isClassProperty",
          "isCompletionRecord",
          "isCompletionStatement",
          "isConditional",
          "isConditionalExpression",
          "isConstantExpression",
          "isContinueStatement",
          "isDebuggerStatement",
          "isDecimalLiteral",
          "isDeclaration",
          "isDeclareClass",
          "isDeclareExportAllDeclaration",
          "isDeclareExportDeclaration",
          "isDeclareFunction",
          "isDeclareInterface",
          "isDeclareModule",
          "isDeclareModuleExports",
          "isDeclareOpaqueType",
          "isDeclareTypeAlias",
          "isDeclareVariable",
          "isDeclaredPredicate",
          "isDecorator",
          "isDenylisted",
          "isDescendant",
          "isDirective",
          "isDirectiveLiteral",
          "isDoExpression",
          "isDoWhileStatement",
          "isEmptyStatement",
          "isEmptyTypeAnnotation",
          "isEnumBody",
          "isEnumBooleanBody",
          "isEnumBooleanMember",
          "isEnumDeclaration",
          "isEnumDefaultedMember",
          "isEnumMember",
          "isEnumNumberBody",
          "isEnumNumberMember",
          "isEnumStringBody",
          "isEnumStringMember",
          "isEnumSymbolBody",
          "isExistentialTypeParam",
          "isExistsTypeAnnotation",
          "isExportAllDeclaration",
          "isExportDeclaration",
          "isExportDefaultDeclaration",
          "isExportDefaultSpecifier",
          "isExportNamedDeclaration",
          "isExportNamespaceSpecifier",
          "isExportSpecifier",
          "isExpression",
          "isExpressionStatement",
          "isExpressionWrapper",
          "isFile",
          "isFlow",
          "isFlowBaseAnnotation",
          "isFlowDeclaration",
          "isFlowPredicate",
          "isFlowType",
          "isFor",
          "isForAwaitStatement",
          "isForInStatement",
          "isForOfStatement",
          "isForStatement",
          "isForXStatement",
          "isFunction",
          "isFunctionDeclaration",
          "isFunctionExpression",
          "isFunctionParent",
          "isFunctionTypeAnnotation",
          "isFunctionTypeParam",
          "isGenerated",
          "isGenericType",
          "isGenericTypeAnnotation",
          "isIdentifier",
          "isIfStatement",
          "isImmutable",
          "isImport",
          "isImportAttribute",
          "isImportDeclaration",
          "isImportDefaultSpecifier",
          "isImportExpression",
          "isImportNamespaceSpecifier",
          "isImportOrExportDeclaration",
          "isImportSpecifier",
          "isInStrictMode",
          "isIndexedAccessType",
          "isInferredPredicate",
          "isInterfaceDeclaration",
          "isInterfaceExtends",
          "isInterfaceTypeAnnotation",
          "isInterpreterDirective",
          "isIntersectionTypeAnnotation",
          "isJSX",
          "isJSXAttribute",
          "isJSXClosingElement",
          "isJSXClosingFragment",
          "isJSXElement",
          "isJSXEmptyExpression",
          "isJSXExpressionContainer",
          "isJSXFragment",
          "isJSXIdentifier",
          "isJSXMemberExpression",
          "isJSXNamespacedName",
          "isJSXOpeningElement",
          "isJSXOpeningFragment",
          "isJSXSpreadAttribute",
          "isJSXSpreadChild",
          "isJSXText",
          "isLVal",
          "isLabeledStatement",
          "isLiteral",
          "isLogicalExpression",
          "isLoop",
          "isMemberExpression",
          "isMetaProperty",
          "isMethod",
          "isMiscellaneous",
          "isMixedTypeAnnotation",
          "isModuleDeclaration",
          "isModuleExpression",
          "isModuleSpecifier",
          "isNewExpression",
          "isNodeType",
          "isNoop",
          "isNullLiteral",
          "isNullLiteralTypeAnnotation",
          "isNullableTypeAnnotation",
          "isNumberLiteral",
          "isNumberLiteralTypeAnnotation",
          "isNumberTypeAnnotation",
          "isNumericLiteral",
          "isNumericLiteralTypeAnnotation",
          "isObjectExpression",
          "isObjectMember",
          "isObjectMethod",
          "isObjectPattern",
          "isObjectProperty",
          "isObjectTypeAnnotation",
          "isObjectTypeCallProperty",
          "isObjectTypeIndexer",
          "isObjectTypeInternalSlot",
          "isObjectTypeProperty",
          "isObjectTypeSpreadProperty",
          "isOpaqueType",
          "isOptionalCallExpression",
          "isOptionalIndexedAccessType",
          "isOptionalMemberExpression",
          "isParenthesizedExpression",
          "isPattern",
          "isPatternLike",
          "isPipelineBareFunction",
          "isPipelinePrimaryTopicReference",
          "isPipelineTopicExpression",
          "isPlaceholder",
          "isPrivate",
          "isPrivateName",
          "isProgram",
          "isProperty",
          "isPure",
          "isPureish",
          "isQualifiedTypeIdentifier",
          "isRecordExpression",
          "isReferenced",
          "isReferencedIdentifier",
          "isReferencedMemberExpression",
          "isRegExpLiteral",
          "isRegexLiteral",
          "isRestElement",
          "isRestProperty",
          "isReturnStatement",
          "isScopable",
          "isScope",
          "isSequenceExpression",
          "isSpreadElement",
          "isSpreadProperty",
          "isStandardized",
          "isStatement",
          "isStatementOrBlock",
          "isStatic",
          "isStaticBlock",
          "isStringLiteral",
          "isStringLiteralTypeAnnotation",
          "isStringTypeAnnotation",
          "isSuper",
          "isSwitchCase",
          "isSwitchStatement",
          "isSymbolTypeAnnotation",
          "isTSAnyKeyword",
          "isTSArrayType",
          "isTSAsExpression",
          "isTSBaseType",
          "isTSBigIntKeyword",
          "isTSBooleanKeyword",
          "isTSCallSignatureDeclaration",
          "isTSConditionalType",
          "isTSConstructSignatureDeclaration",
          "isTSConstructorType",
          "isTSDeclareFunction",
          "isTSDeclareMethod",
          "isTSEntityName",
          "isTSEnumDeclaration",
          "isTSEnumMember",
          "isTSExportAssignment",
          "isTSExpressionWithTypeArguments",
          "isTSExternalModuleReference",
          "isTSFunctionType",
          "isTSImportEqualsDeclaration",
          "isTSImportType",
          "isTSIndexSignature",
          "isTSIndexedAccessType",
          "isTSInferType",
          "isTSInstantiationExpression",
          "isTSInterfaceBody",
          "isTSInterfaceDeclaration",
          "isTSIntersectionType",
          "isTSIntrinsicKeyword",
          "isTSLiteralType",
          "isTSMappedType",
          "isTSMethodSignature",
          "isTSModuleBlock",
          "isTSModuleDeclaration",
          "isTSNamedTupleMember",
          "isTSNamespaceExportDeclaration",
          "isTSNeverKeyword",
          "isTSNonNullExpression",
          "isTSNullKeyword",
          "isTSNumberKeyword",
          "isTSObjectKeyword",
          "isTSOptionalType",
          "isTSParameterProperty",
          "isTSParenthesizedType",
          "isTSPropertySignature",
          "isTSQualifiedName",
          "isTSRestType",
          "isTSSatisfiesExpression",
          "isTSStringKeyword",
          "isTSSymbolKeyword",
          "isTSThisType",
          "isTSTupleType",
          "isTSType",
          "isTSTypeAliasDeclaration",
          "isTSTypeAnnotation",
          "isTSTypeAssertion",
          "isTSTypeElement",
          "isTSTypeLiteral",
          "isTSTypeOperator",
          "isTSTypeParameter",
          "isTSTypeParameterDeclaration",
          "isTSTypeParameterInstantiation",
          "isTSTypePredicate",
          "isTSTypeQuery",
          "isTSTypeReference",
          "isTSUndefinedKeyword",
          "isTSUnionType",
          "isTSUnknownKeyword",
          "isTSVoidKeyword",
          "isTaggedTemplateExpression",
          "isTemplateElement",
          "isTemplateLiteral",
          "isTerminatorless",
          "isThisExpression",
          "isThisTypeAnnotation",
          "isThrowStatement",
          "isTopicReference",
          "isTryStatement",
          "isTupleExpression",
          "isTupleTypeAnnotation",
          "isTypeAlias",
          "isTypeAnnotation",
          "isTypeCastExpression",
          "isTypeParameter",
          "isTypeParameterDeclaration",
          "isTypeParameterInstantiation",
          "isTypeScript",
          "isTypeofTypeAnnotation",
          "isUnaryExpression",
          "isUnaryLike",
          "isUnionTypeAnnotation",
          "isUpdateExpression",
          "isUser",
          "isUserWhitespacable",
          "isV8IntrinsicIdentifier",
          "isVar",
          "isVariableDeclaration",
          "isVariableDeclarator",
          "isVariance",
          "isVoidTypeAnnotation",
          "isWhile",
          "isWhileStatement",
          "isWithStatement",
          "isYieldExpression",
          "isnt",
          "matchesPattern",
          "popContext",
          "pushContainer",
          "pushContext",
          "referencesImport",
          "remove",
          "replaceExpressionWithStatements",
          "replaceInline",
          "replaceWith",
          "replaceWithMultiple",
          "replaceWithSourceString",
          "requeue",
          "resolve",
          "resync",
          "setContext",
          "setKey",
          "setScope",
          "setup",
          "shareCommentsWithSiblings",
          "skip",
          "skipKey",
          "stop",
          "toComputedKey",
          "unshiftContainer",
          "unwrapFunctionEnvironment",
          "updateSiblingKeys",
          "visit",
          "willIMaybeExecuteBefore",
        ]
      `);
    });
  });
});
