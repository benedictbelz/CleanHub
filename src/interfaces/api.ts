export interface ApiHub {
    assignable: boolean;
    cardDescription: string;
    cardImage: {
        directLink: string;
        fileName: string;
        size: number;
        thumbnailDirectLink: string;
        uuid: string;
        processedDirectLink?: null;
        processedThumbnailDirectLink?: null;
    };
    category: 'ASSIGNABLE' | 'PORTFOLIO';
    collectionAndSortingParagraph: string | null;
    displayName: string;
    externalId: string | null;
    formattedRecoveredQuantity: string;
    formattedTotalRecoveredQuantity: string;
    hubUnassignedRecoveryList: {
        assignedQuantity: number;
        createdAt: string;
        quantityUnit: 'KG';
        state: 'PARTIALLY_ASSIGNED' | 'UNASSIGNED';
        unassignedQuantity: number;
        uuid: string;
    }[];
    location: string | null;
    logo: {
        directLink: string;
        fileName: string;
        size: number;
        thumbnailDirectLink: string;
        uuid: string;
        processedDirectLink?: null;
        processedThumbnailDirectLink?: null;
    } | null;
    name: string;
    pageMode: 'RELEASED';
    parentHubName: string | null;
    portfolioAssignedQuantityPercentage: number | null;
    recoveredQuantity: number;
    recoveredQuantityUnit: 'KG';
    referenceQuantityUnit: 'KG';
    slug: string | null;
    stage: 'PILOT' | 'FULLY_ONBOARDED';
    state: 'ACTIVE' | 'DEMO';
    thankYouNote: string | null;
    totalRecoveredQuantity: number;
    type: string | null;
    unassignedQuantityPercentage: number;
    unassignedQuantityTotal: number;
    uuid: string;
}
