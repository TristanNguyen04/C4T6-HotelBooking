import React, { useMemo, useState, useEffect, useCallback } from 'react';
import type { Hotel } from '../../types/hotel';
import { assets } from '../../assets/assets';

interface HotelImageProps {
    hotel: Hotel;
}

const HotelImage: React.FC<HotelImageProps> = ({ hotel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const imageCount = hotel.number_of_images || 0;
    const imagePrefix = hotel.image_details?.prefix || '';
    const imageSuffix = hotel.image_details?.suffix || '';
    
    const generateImageUrl = (index: number) => {
        if (imageCount > 0 && imagePrefix && imageSuffix) {
            return `${imagePrefix}${index}${imageSuffix}`;
        }
        return assets.hotelNotFound;
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = assets.hotelNotFound;
    };

    const images = useMemo(() => {
        if (imageCount === 0) {
            return [assets.hotelNotFound];
        }
        return Array.from({ length: imageCount }, (_, index) => generateImageUrl(index));
    }, [imageCount, imagePrefix, imageSuffix]);

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1);
    };

    const goToNext = () => {
        setCurrentImageIndex(currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0);
    };

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isModalOpen) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    }, [isModalOpen, currentImageIndex, images.length]);

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [handleKeyDown, isModalOpen]);

    const handleSeeAllPhotos = (e: React.MouseEvent) => {
        e.preventDefault();
        if (images.length > 0) {
            openModal(0);
        }
    };

    if (imageCount === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
                <div className="aspect-video w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={assets.hotelNotFound}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
                    
                    {/* See All Photos Button */}
                    <button
                        onClick={handleSeeAllPhotos}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        aria-label="Open hotel photo gallery"
                    >
                        <span>See all photos ({imageCount})</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Grid Layout */}
                <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105 flex-shrink-0"
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={image}
                                    alt={`${hotel.name} - View ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="mt-2 text-xs text-gray-500 text-center">
                    {images.length > 6 && "← Scroll to see more photos →"}
                </div>
            </div>

            {/* Simple Modal with Blurred Background */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-[1100] flex items-center justify-center p-8">
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">{hotel.name}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                                aria-label="Close gallery"
                            >
                                ×
                            </button>
                        </div>

                        {/* Image Display - Fixed Height */}
                        <div className="relative bg-gray-100">
                            <div className="h-96 flex items-center justify-center">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${hotel.name} - View ${currentImageIndex + 1}`}
                                    className="max-w-full h-full object-contain"
                                    onError={handleImageError}
                                />
                            </div>
                            
                            {/* Navigation arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all"
                                        aria-label="Next image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex items-center justify-center text-sm text-gray-600">
                                {currentImageIndex + 1} of {images.length} photos
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HotelImage; 